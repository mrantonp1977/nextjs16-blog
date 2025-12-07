'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/convex/_generated/api';
import { PostSchema } from '@/schemas/blog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'convex/react';
import {  Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const CreateRoute = () => {
  const [isPending, startTransition] = useTransition();
  const mutation = useMutation(api.posts.createPost);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  function onSubmit(values: z.infer<typeof PostSchema>) {
    startTransition(() => {
      mutation({
        body: values.content,
        title: values.title,
      });
      toast.success('Post created successfully!');
      router.push('/');
    });
  }

  return (
    <div className="py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Create a New Post</h1>
        <p className="text-lg text-muted-foreground pt-4">
          Share your thoughts with the community by creating a new post.
        </p>
      </div>
      <Card className="max-w-xl w-full mx-auto">
        <CardHeader>
          <CardTitle>New Blog Post</CardTitle>
          <CardDescription>
            This is where the form to create a new blog post will go.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Enter the title of your post"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Content</FieldLabel>
                    <Textarea
                      {...field}
                      placeholder="Enter the content of your post"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <span>Create Post</span>
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateRoute;
