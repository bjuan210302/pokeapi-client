import { useState, useContext } from 'react'
import { Button, Card, Center, Checkbox, Group, TextInput, Transition } from '@mantine/core'
import { IconEdit, IconLogin } from '@tabler/icons'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp, userContext } from '../main'
import { showNotification, NotificationsProvider } from '@mantine/notifications';

function Login() {
  const firebaseAuth = getAuth(firebaseApp);
  const { setUid } = useContext(userContext);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('email@email.com');
  const [password, setPassword] = useState('asdasd');
  const [passwordConfirm, setPasswordConfirm] = useState('asdasd');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const loginOrRegister = () => {
    if (isLogin) {
      signInWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredential) => {
          setUid(userCredential.user.uid);
        })
        .catch((error) => {
          showErrorNotification(error.message);
        });
    } else {
      createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredential) => {
          setUid(userCredential.user.uid);
        })
        .catch((error) => {
          showErrorNotification(error.message);
        });
    }
  }

  const showErrorNotification = (msg: string) => {
    showNotification({
      autoClose: 5000,
      title: "Auth error",
      message: msg,
      color: 'red',
      sx: { borderColor: '#f7babe' },
    });
  }
  const checkButtonDisabled = () => {
    if (isLogin)
      return email === '' || password === '';
    else
      return email === '' || password === '' || password !== passwordConfirm || !isCheckboxChecked;
  }

  return (
    <NotificationsProvider position='top-center'>
      <Center style={{ height: '100vh' }}>
        <Card shadow="sm" p="lg" radius="sm" withBorder style={{ width: 600 }} >
          <Group grow>
            <Button rightIcon={<IconLogin size={14} />} variant={isLogin ? 'filled' : 'subtle'}
              onClick={() => setIsLogin(true)}>Entrar</Button>
            <Button rightIcon={<IconEdit size={14} />} variant={isLogin ? 'subtle' : 'filled'}
              onClick={() => setIsLogin(false)}>Registrarse</Button>
          </Group>
          <TextInput value={email} label="Email" placeholder="email@email.com" mt='lg' withAsterisk
            onChange={(e) => setEmail(e.target.value)} />
          <TextInput value={password} label="Contraseña" placeholder="password" type='password' mt='md' withAsterisk
            onChange={(e) => setPassword(e.target.value)} />
          <Transition mounted={!isLogin} transition="scale-x" duration={250} timingFunction="ease">
            {(tranStyles) => <TextInput style={tranStyles} value={passwordConfirm} label="Confirmar contraseña"
              placeholder="password" type='password' mt='md' withAsterisk
              onChange={(e) => setPasswordConfirm(e.target.value)} />}
          </Transition>
          <Transition mounted={!isLogin} transition="scale-x" duration={250} timingFunction="ease">
            {(tranStyles) => <Checkbox style={tranStyles} mt="xl" label="Si a todo" checked={isCheckboxChecked}
              onChange={() => setIsCheckboxChecked((isCheckboxChecked) => !isCheckboxChecked)} />}
          </Transition>
          <Group position="right" mt="md">
            <Button onClick={loginOrRegister} disabled={checkButtonDisabled()}>
              {isLogin ? 'Entrar' : 'Registrarse'}
            </Button>
          </Group>
        </Card>
      </Center>
    </NotificationsProvider>
  )
}

export default Login
