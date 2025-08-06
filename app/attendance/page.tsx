// app/attendance/page.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClientTime } from '../components/ClientTime';
import { useMutation } from '@tanstack/react-query';
import { useToast } from "@/components/ui/use-toast"

const clockAction = async (action: 'clock-in' | 'clock-out') => {
  const res = await fetch('/api/attendance', {
    method: 'POST',
    body: JSON.stringify({ action }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'An error occurred');
  }
  return data;
};

export default function AttendancePage() {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: clockAction,
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: data.message,
      })
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    },
  });

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Clock In / Out</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <ClientTime />
          <div className="flex justify-around w-full mt-8">
            <Button
              size="lg"
              onClick={() => mutation.mutate('clock-in')}
              disabled={mutation.isPending}
            >
              Clock In
            </Button>
            <Button
              size="lg"
              variant="destructive"
              onClick={() => mutation.mutate('clock-out')}
              disabled={mutation.isPending}
            >
              Clock Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
