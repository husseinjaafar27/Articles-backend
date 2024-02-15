const emailTemplate = (code) => {
  return `
    We're thrilled to see you!
    <br/>
    <br/>
    We're sending you a verification code: <b>${code}</b>. This verification code is all you need to access your account!
    <br/>
    <br/>
    If you have any questions or need assistance, don't hesitate to reach out to us at husseinjaafar.dev@gmail.com.
    <br/>
    <br/>
    Hussein Jaafar
`;
};

export default emailTemplate;
