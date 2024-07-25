"use client";

import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SettingsSchema } from "@/schemas";
import { useSession } from "next-auth/react";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { date } from "zod";

export default function SettingsPage() {
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onClick = () => {
    startTransition(() => {
      settings({ name: "New Name" })
        .then((data) => {
          if (data.error) {
            setError(data?.error);
          }

          if (data?.success) {
            update();
            setSuccess(data?.success);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">⚙ Settings</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={onClick} disabled={isPending}>
          Update Name
        </Button>
      </CardContent>
    </Card>
  );
}
