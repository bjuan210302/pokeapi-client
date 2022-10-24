import { AppShell, Group, Stack, ThemeIcon, UnstyledButton, Text } from '@mantine/core';
import { IconPhoto, IconHeart, IconArrowBarLeft } from '@tabler/icons';
import { Navbar } from '@mantine/core';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { firebaseApp, userContext } from '../main';
import { useContext } from 'react';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  onClickProp?: () => void;
}

function MainLink(props: MainLinkProps) {
  const { icon, color, label, onClickProp } = props;
  const navigate = useNavigate();
  return (
    <UnstyledButton px='xl' py='sm'
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        borderRadius: theme.radius.sm,
        '&:hover': {
          backgroundColor: theme.colors.gray[0],
        },
      })}
      onClick={() => {
        if (onClickProp) onClickProp()
        else navigate(label)
      }}
    >
      <Group>
        <ThemeIcon size='xl' color={color} variant="light">
          {icon}
        </ThemeIcon>
        <Text size="lg">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

function CNavbar() {
  const firebaseAuth = getAuth(firebaseApp);
  const { setUid } = useContext(userContext);
  const navLinks = [
    { icon: <IconPhoto size={22} />, color: 'teal', label: 'All Pokémon' },
    { icon: <IconHeart size={22} />, color: 'red', label: 'My Favorites' },
  ];
  const logout = () => {
    signOut(firebaseAuth).then(() => setUid('')).catch();
  }
  return (
    <Navbar p="xs" width={{ base: 300 }}>
      <Navbar.Section>{/* Header with logo */}</Navbar.Section>
      <Navbar.Section grow mt="md">
        <Stack>
          {navLinks.map((link) => <MainLink {...link} key={link.label} />)}
          <MainLink icon={<IconArrowBarLeft size={22} />} color='indigo' label='Logout'
            onClickProp={logout} />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}

function App() {
  return (
    <AppShell
      padding="md"
      navbar={<CNavbar />}
    >
      <Outlet />
    </AppShell>
  );
};

export default App;