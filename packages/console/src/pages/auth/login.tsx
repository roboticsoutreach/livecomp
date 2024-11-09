import { Button, Container, ContentLayout, Form, Header, Input, SpaceBetween } from "@cloudscape-design/components";
import { $api } from "../../modules/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledFormField from "../../components/form/FormField";
import FormRootError from "../../components/form/FormRootError";

const formSchema = z.object({
    username: z.string(),
    password: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginPage() {
    const { mutate: login, isPending } = $api.useMutation("post", "/auth/login/credentials", {
        onError: (error) => {
            form.setError("root", { message: error.message });
        },
    });

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });
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

                                <FormRootError form={form} />

                                <ControlledFormField
                                    form={form}
                                    name="username"
                                    render={({ field }) => <Input placeholder="Username" {...field} />}
                                />

                                <ControlledFormField
                                    form={form}
                                    name="password"
                                    render={({ field }) => <Input placeholder="Password" type="password" {...field} />}
                                />

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

