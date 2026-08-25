import { Resource } from '@/data/types';
import { detectResourceType, getConsistentColor, extractUrls, getDomainName } from './utils';

export async function fetchInstagramResources(): Promise<Resource[]> {
  const accessToken = process.env.USER_ACCESS_TOKEN;
  const igUserId = process.env.IG_USER_ID;

  if (!accessToken || !igUserId) {
    console.log('USER_ACCESS_TOKEN or IG_USER_ID is not set.');
    return [];
  }

  try {
    // 1. Verify the Instagram account
    console.log('Verifying Instagram account...');
    const profileRes = await fetch(
      `https://graph.instagram.com/v21.0/me?fields=user_id,username,name&access_token=${accessToken}`,
      { cache: 'no-store' }
    );

    if (!profileRes.ok) {
      console.warn('Failed to verify Instagram account:', await profileRes.text());
      return [];
    }

    const profile = await profileRes.json();
    console.log(`Authenticated as: @${profile.username} (${profile.name}) ID: ${profile.user_id}`);

    // Use the user_id returned by the API (more reliable than env var)
    const resolvedUserId = profile.user_id || igUserId;

    // 2. Fetch conversations using Instagram Business API
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

    // 3. Process messages and extract URLs
    for (const conv of conversations) {
      const messages = conv.messages?.data || [];
      for (const msg of messages) {
        const text = msg.message || '';
        const foundUrls: string[] = [...extractUrls(text)];

        // Deduplicate URLs
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
    console.error('Error fetching from Instagram Graph API:', error);
    return [];
  }
}
