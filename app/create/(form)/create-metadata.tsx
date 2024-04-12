"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateToken } from "@/lib/zustand/create-token.store";
import {
  MetadataSchema,
  metadataDefaults,
  metadataSchema,
} from "@/lib/schemas/metadata.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CreateMetadata() {
  const { handleNextPage, setMetadata } = useCreateToken();

  const form = useForm<MetadataSchema>({
    resolver: zodResolver(metadataSchema),
    defaultValues: metadataDefaults,
  });

  const onSubmit = (values: MetadataSchema) => {
    setMetadata(values);
    handleNextPage();
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <div className="col-span-2">
            <div className="flex flex-col gap-2">
              <p className="text-white">Image</p>
              <Input type="file" />
            </div>
          </div>

          <div className="col-span-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="symbol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Symbol</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
          </div>
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Description</FormLabel>
                  <FormControl>
                    <div className="grid w-full gap-1.5">
                      <Textarea
                        {...field}
                        placeholder="Type your message here."
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-2 flex justify-end items-center">
            <Button type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
