import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const MESSAGES_FILE = path.join(process.cwd(), 'data', 'messages.json');

async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

async function readMessages() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(MESSAGES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeMessages(messages: any[]) {
  await ensureDataDir();
  await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));
}

export async function GET() {
  try {
    const messages = await readMessages();
    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.json({ messages: [] }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, message } = await request.json();
    
    if (!name || !message) {
      return NextResponse.json({ success: false, message: 'الاسم والرسالة مطلوبان' }, { status: 400 });
    }
    
    const messages = await readMessages();
    const newMessage = {
      id: Date.now(),
      name,
      message,
      timestamp: new Date().toISOString()
    };
    
    messages.push(newMessage);
    await writeMessages(messages);
    
    return NextResponse.json({ success: true, message: newMessage });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'حدث خطأ' }, { status: 500 });
  }
}
