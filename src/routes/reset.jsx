import { useForm } from "react-hook-form";
import { auth } from "../firebase";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import { Error, Form, Input, Title, Wrapper } from "../components/auth-components";
import styled from "styled-components";

const Text = styled.p`
  padding: 10px 20px;
  margin-top: 50px;
  text-align: center;
`;

export default function Reset() {
  const [ isSended, setIsSended ] = useState(false);
  const [ error, setError ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    if(isLoading || data.email === '' || data.email === '') return;
    try {
      setIsLoading(true);
      
      const result = await sendPasswordResetEmail(auth, data.email);
      console.log(result);

      setIsSended(true);        

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
      { !isSended ? <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
        />
        <Input value={isLoading ? "Loading..." : "Send password reset email"} type="submit" />
        {error !== "" ? <Error>{error}</Error> : null}
      </Form> : <Text>Sended!</Text> }
    </Wrapper>
  );
}
