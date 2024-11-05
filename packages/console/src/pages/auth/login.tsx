import {
    Button,
    Container,
    ContentLayout,
    Form,
    FormField,
    Header,
    Input,
    SpaceBetween,
} from "@cloudscape-design/components";
import { useForm } from "@tanstack/react-form";
import { $api } from "../../modules/api";

type FormData = {
    email: string;
    password: string;
};

export default function LoginPage() {
    const { mutate: login, isPending } = $api.useMutation("post", "/auth/login/credentials", {
        onError: (error) => {
            alert(error.message);
        },
    });

    const form = useForm<FormData>({
        onSubmit: ({ value: data }) =>
            login({
                body: data,
            }),
    });

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
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                form.handleSubmit();
                            }}
                        >
                            <SpaceBetween direction="vertical" size="s">
                                <span>Enter your credentials below to login.</span>

                                <FormField stretch>
                                    <form.Field
                                        name="email"
                                        children={(field) => (
                                            <Input
                                                placeholder="Email"
                                                type="email"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.detail.value)}
                                            />
                                        )}
                                    />
                                </FormField>

                                <FormField stretch>
                                    <form.Field
                                        name="password"
                                        children={(field) => (
                                            <Input
                                                placeholder="Password"
                                                type="password"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.detail.value)}
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

