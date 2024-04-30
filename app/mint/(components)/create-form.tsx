"use client";
import {
  MintFormSchema,
  MintFormSchemaDefaults,
} from "@/lib/schemas/mint-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useCreateToken from "@/hooks/useCreateToken";

function CreateForm() {
  const [current, setcurrent] = useState<null | any>(null);

  const { handleCreateToken } = useCreateToken();

  const form = useForm<MintFormSchema>({
    resolver: zodResolver(MintFormSchema),
    defaultValues: MintFormSchemaDefaults,
  });

  const onSubmit = async (values: MintFormSchema) => {
    const formData = new FormData();
    formData.append("image", current);
    formData.append(
      "metadata",
      JSON.stringify({
        name: values.name,
        symbol: values.symbol,
        description: values.description,
      })
    );

    handleCreateToken(values, formData);
  };

  return (
    <Form {...form}>
      <FormItem>
        <FormLabel>Image</FormLabel>
        <FormControl>
          <Input
            type="file"
            onChange={(e) => {
              if (e.target.files) setcurrent(e.target.files[0]);
            }}
          />
        </FormControl>
        <FormMessage />
      </FormItem>

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="symbol"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Symbol</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>amount</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="decimals"
        render={({ field }) => (
          <FormItem>
            <FormLabel>decimals</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button onClick={form.handleSubmit(onSubmit)}>Submit</Button>
    </Form>
  );
}

export default CreateForm;
