import { Resource } from '@/data/types';
import { detectResourceType, getConsistentColor, extractUrls, getDomainName } from './utils';
import { supabaseAdmin } from './supabase';

export async function fetchInstagramResources(igUserId?: string): Promise<Resource[]> {
  let accessToken = process.env.USER_ACCESS_TOKEN;
  let targetUserId = igUserId || process.env.IG_USER_ID;

  // Attempt to fetch user's specific long-lived token from Supabase if igUserId is provided
  if (igUserId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('user_tokens')
        .select('access_token')
        .eq('user_id', igUserId)
        .single();
      
      if (data && data.access_token) {
        accessToken = data.access_token;
      }
    } catch (e) {
      console.warn('Could not fetch token from Supabase, falling back to env var:', e);
    }
  }

  if (!accessToken) {
    console.log('No access token available for Instagram fetch.');
    return [];
  }

  try {
    console.log('Verifying Instagram account...');
    const profileRes = await fetch(
      `https://graph.instagram.com/v21.0/me?fields=user_id,username,name&access_token=${accessToken}`,
      { cache: 'no-store' }
    );

    if (!profileRes.ok) {
      const errBody = await profileRes.json().catch(() => ({}));
      if (errBody?.error?.code === 190 || profileRes.status === 401) {
        const err = new Error('Instagram session expired or permission revoked.');
        err.name = 'TokenExpiredError';
        throw err;
      }
      console.warn('Failed to verify Instagram account:', JSON.stringify(errBody));
      return [];
    }

    const profile = await profileRes.json();
    console.log(`Authenticated as: @${profile.username} (${profile.name}) ID: ${profile.user_id}`);

    const resolvedUserId = profile.user_id || targetUserId;

    console.log('Fetching Instagram conversations...');
    const convResponse = await fetch(
      `https://graph.instagram.com/v21.0/${resolvedUserId}/conversations?platform=instagram&fields=id,updated_time,messages.limit(25){id,message,from,created_time}&access_token=${accessToken}`,
      { cache: 'no-store' }
    );

    if (!convResponse.ok) {
      const errText = await convResponse.text();
      console.warn('Failed to fetch conversations:', errText);
      return [];
    }

    const convData = await convResponse.json();
    const conversations = convData.data || [];
    const resources: Resource[] = [];

    console.log(`Found ${conversations.length} conversation threads.`);

    for (const conv of conversations) {
      const messages = conv.messages?.data || [];
      for (const msg of messages) {
        const text = msg.message || '';
        const foundUrls: string[] = [...extractUrls(text)];
        const uniqueUrls = Array.from(new Set(foundUrls));

        if (uniqueUrls.length > 0) {
          const sender = msg.from?.username || msg.from?.name || 'creator';
          const createdTime = new Date(msg.created_time);
          
          for (const url of uniqueUrls) {
            const domain = getDomainName(url);
            const title = text.length > 0 ? (text.length > 60 ? text.substring(0, 60) + '...' : text) : domain;
            const type = detectResourceType(url);
            
            const dateStr = createdTime.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            });
            const timeStr = createdTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            }).toLowerCase();

            const avatar = sender.substring(0, 2).toUpperCase();
            const avatarColor = getConsistentColor(sender);

            resources.push({
              id: msg.id + '_' + encodeURIComponent(url),
              title,
              creator: sender,
              type,
              date: dateStr,
              time: timeStr,
              url,
              tag: 'new',
              avatar,
              avatarColor
            });
          }
        }
      }
    }

    console.log(`Successfully extracted ${resources.length} resources from live DMs.`);
    return resources;
  } catch (error) {
    if ((error as any)?.name === 'TokenExpiredError') {
      throw error;
    }
    console.error('Error fetching from Instagram Graph API:', error);
    return [];
  }
}
