import { NextRequest, NextResponse } from 'next/server';

const SECRET_CODE = 'VRM1';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    
    if (code === SECRET_CODE) {
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ success: false, message: 'الكود غير صحيح' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'حدث خطأ' }, { status: 500 });
  }
}
