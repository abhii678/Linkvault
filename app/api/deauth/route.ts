import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    console.log('Received Meta Deauth notification:', body);

    if (body.user_id) {
      await supabaseAdmin.from('user_tokens').delete().eq('user_id', body.user_id);
    }

    return NextResponse.json({ success: true, message: 'Deauthorized successfully' });
  } catch (error) {
    console.error('Error in deauth webhook:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
