import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/auth-components";
import GithubButton from "../components/github-btn";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [ error, setError ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    if(isLoading || data.name === '' || data.email === '' || data.email === '') return;
    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(auth, data.email, data.password);
      
      // set user name
      await updateProfile(credentials.user, {
        displayName: data.name
      });

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
      <Title>Join X</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("name", { required: "Please Write a category" })}
          type="text"
          placeholder="Name"
        />
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
        <Input value={isLoading ? "Loading..." : "Create Account"} type="submit" />
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
          Already have an account? {" "}
          <Link to="/login">Log in &rarr;</Link>
        </Switcher>
        <GithubButton />
      </Form>
    </Wrapper>
  );
}
