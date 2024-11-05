import {
    Alert,
    Button,
    Container,
    ContentLayout,
    Form,
    FormField,
    Header,
    Input,
    SpaceBetween,
} from "@cloudscape-design/components";
import { $api } from "../../modules/api";
import { Controller, useForm } from "react-hook-form";

type FormData = {
    email: string;
    password: string;
};

export default function LoginPage() {
    const { mutate: login, isPending } = $api.useMutation("post", "/auth/login/credentials", {
        onError: (error) => {
            form.setError("root", { message: error.message });
        },
    });

    const form = useForm<FormData>();
    const onSubmit = (data: FormData) => login({ body: data });

    return (
        <>
            <ContentLayout
                defaultPadding
                headerVariant="high-contrast"
                maxContentWidth={600}
                header={
                    <Header variant="h1" description="Login to your Livecomp account here.">
                        Login
                    </Header>
                }
            >
                <Container>
                    <Form>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <SpaceBetween direction="vertical" size="s">
                                <span>Enter your credentials below to login.</span>

                                {form.formState.errors.root && (
                                    <Alert type="error">{form.formState.errors.root.message}</Alert>
                                )}

                                <FormField stretch>
                                    <Controller
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <Input
                                                placeholder="Email"
                                                type="email"
                                                {...field}
                                                onChange={(e) => field.onChange({ target: e.detail })}
                                            />
                                        )}
                                    />
                                </FormField>

                                <FormField stretch>
                                    <Controller
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <Input
                                                placeholder="Password"
                                                type="password"
                                                {...field}
                                                onChange={(e) => field.onChange({ target: e.detail })}
                                            />
                                        )}
                                    />
                                </FormField>

                                <Button variant="primary" formAction="submit" loading={isPending}>
                                    Login
                                </Button>
                            </SpaceBetween>
                        </form>
                    </Form>
                </Container>
            </ContentLayout>
        </>
    );
}

