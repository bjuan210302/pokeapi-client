import { AppShell, Group, Stack, ThemeIcon, UnstyledButton, Text } from '@mantine/core';
import { IconPhoto, IconHeart, IconSettings } from '@tabler/icons';
import { Navbar } from '@mantine/core';
import { Link, Outlet } from 'react-router-dom';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
}

function MainLink(props: MainLinkProps) {
  const { icon, color, label } = props;
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
      onClick={() => { }}
    >
      <Link to={label} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Group>
          <ThemeIcon size='xl' color={color} variant="light">
            {icon}
          </ThemeIcon>
          <Text size="lg">{label}</Text>
        </Group>
      </Link>
    </UnstyledButton>
  );
}

function CNavbar() {
  const data = [
    { icon: <IconPhoto size={22} />, color: 'teal', label: 'Memes' },
    { icon: <IconHeart size={22} />, color: 'red', label: 'Favourites' },
    { icon: <IconSettings size={22} />, color: 'indigo', label: 'Settings' },
  ];
  return (
    <Navbar p="xs" width={{ base: 300 }}>
      <Navbar.Section>{/* Header with logo */}</Navbar.Section>
      <Navbar.Section grow mt="md">
        <Stack>
          {data.map((link) => <MainLink {...link} key={link.label} />)}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>{/* Footer with user */}</Navbar.Section>
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