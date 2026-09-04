import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    console.log('Received Meta Data Deletion request:', body);

    const userId = body.user_id || 'unknown';
    if (userId !== 'unknown') {
      await supabaseAdmin.from('user_tokens').delete().eq('user_id', userId);
    }

    const confirmationCode = 'DEL_' + Date.now();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dmvault.app';
    const statusUrl = `${baseUrl}/data-deletion?code=${confirmationCode}`;

    return NextResponse.json({
      url: statusUrl,
      confirmation_code: confirmationCode
    });
  } catch (error) {
    console.error('Error in data deletion callback:', error);
    return NextResponse.json({ error: 'Failed to process deletion request' }, { status: 500 });
  }
}
