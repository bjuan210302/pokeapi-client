import { Button, Card, Center, Checkbox, Group, TextInput, Transition } from '@mantine/core'
import { IconEdit, IconLogin } from '@tabler/icons'
import { useState } from 'react'
import { Link } from 'react-router-dom';

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Center style={{ height: '100vh' }}>
      <Card shadow="sm" p="lg" radius="sm" withBorder style={{ width: 600 }} >
        <Group grow>
          <Button rightIcon={<IconLogin size={14} />} variant={isLogin ? 'filled' : 'subtle'}
            onClick={() => setIsLogin(true)}>Entrar</Button>
          <Button rightIcon={<IconEdit size={14} />} variant={isLogin ? 'subtle' : 'filled'}
            onClick={() => setIsLogin(false)}>Registrarse</Button>
        </Group>

        <TextInput withAsterisk label="Username" placeholder="your-user-name" mt='lg' />
        <TextInput withAsterisk label="Contraseña" placeholder="password" type='password' mt='md' />
        <Transition mounted={!isLogin} transition="scale-x" duration={250} timingFunction="ease">
          {(tranStyles) => <TextInput style={tranStyles} withAsterisk label="Confirmar contraseña" placeholder="password" type='password' mt='md' />}
        </Transition>
        <Transition mounted={!isLogin} transition="scale-x" duration={250} timingFunction="ease">
          {(tranStyles) => <Checkbox style={tranStyles} mt="xl" label="Acepto que mi contraseña se guarde en texto plano" />}
        </Transition>

        <Group position="right" mt="md">
          <Button>
            <Link to={'app/memes'} style={{ textDecoration: 'none', color: 'inherit' }}>
              {isLogin ? 'Entrar' : 'Registrarse'}
            </Link>
          </Button>
        </Group>
      </Card>
    </Center>
  )
}

export default Login
