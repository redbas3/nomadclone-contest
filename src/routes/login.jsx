import { useForm } from "react-hook-form";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/auth-components";
import GithubButton from "../components/github-btn";
import ResetPasswordButton from "../components/reset-password-btn";

export default function Login() {
  const navigate = useNavigate();
  const [ error, setError ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    if(isLoading || data.email === '' || data.email === '') return;
    try {
      setIsLoading(true);
      
      await signInWithEmailAndPassword(auth, data.email, data.password);
      
      navigate("/");
    } catch (e) {
      if(e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Log Into FlashScore</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
        />
        <Input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
        />
        <Input value={isLoading ? "Loading..." : "Login"} type="submit" />
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
          Don&apos;t have an account? {" "}
          <Link to="/create-account">Create one &rarr;</Link>
        </Switcher>
        <ResetPasswordButton />
        <GithubButton />
      </Form>
    </Wrapper>
  );
}
