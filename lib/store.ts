// lib/store.ts
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

const dbPath = path.join(process.cwd(), 'db.json');

interface Data {
  users: any[];
  attendanceRecords: any[];
}

// Function to read data from the JSON file
const readData = (): Data => {
  try {
    const jsonString = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(jsonString);
  } catch (error) {
    // If file doesn't exist or is invalid, return default structure
    return { users: [], attendanceRecords: [] };
  }
};

// Function to write data to the JSON file
export const saveData = (data: Data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

const data = readData();

// Hash initial passwords if they aren't already hashed
let needsSave = false;
const hashPasswords = async () => {
  for (const user of data.users) {
    // Simple check to see if password looks like a bcrypt hash
    if (user.password && !user.password.startsWith('$2b$')) {
      user.password = await bcrypt.hash(user.password, 10);
      needsSave = true;
    }
  }
  if (needsSave) {
    saveData(data);
  }
};

// Run the password hashing
hashPasswords();

export const users = data.users;
export const attendanceRecords = data.attendanceRecords;