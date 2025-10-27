import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const MESSAGES_FILE = path.join(process.cwd(), 'data', 'messages.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Get all messages
export async function GET() {
  try {
    await ensureDataDir();
    
    try {
      const data = await fs.readFile(MESSAGES_FILE, 'utf-8');
      const messages = JSON.parse(data);
      return NextResponse.json({ messages });
    } catch {
      // File doesn't exist yet
      return NextResponse.json({ messages: [] });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read messages' }, { status: 500 });
  }
}

// Add a new message
export async function POST(request: NextRequest) {
  try {
    await ensureDataDir();
    
    const { name, message } = await request.json();
    
    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 });
    }
    
    // Read existing messages
    let messages = [];
    try {
      const data = await fs.readFile(MESSAGES_FILE, 'utf-8');
      messages = JSON.parse(data);
    } catch {
      // File doesn't exist yet, start with empty array
    }
    
    // Add new message
    const newMessage = {
      id: Date.now().toString(),
      name,
      message,
      timestamp: new Date().toISOString(),
    };
    
    messages.push(newMessage);
    
    // Save to file
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));
    
    return NextResponse.json({ success: true, message: newMessage });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}
