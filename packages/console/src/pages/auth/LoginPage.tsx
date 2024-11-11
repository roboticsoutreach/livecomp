import { Button, Container, ContentLayout, Form, Header, Input, SpaceBetween } from "@cloudscape-design/components";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledFormField from "../../components/form/ControlledFormField";
import FormRootError from "../../components/form/FormRootError";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/trpc";

const formSchema = z.object({
    username: z.string(),
    password: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginPage() {
    const utils = api.useUtils();

    const navigate = useNavigate();

    const { mutate: login, isPending } = api.auth.login.useMutation({
        onSuccess: async ({ token }) => {
            localStorage.setItem("accessToken", token);
            await utils.users.fetchCurrent.invalidate();
            navigate("/");
        },
        onError: (error) => {
            form.setError("root", { message: error.message });
        },
    });

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });
    const onSubmit = (data: FormData) => login(data);

    return (
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
    );
}

