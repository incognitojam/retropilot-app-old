import { Button, Card, FileInput, Label, TextInput } from 'flowbite-react';
import Layout from '../components/layout';

/**
 * User settings page
 *
 * Change profile picture, account name, etc.
 */
export default function SettingsPage(): JSX.Element {
  return (
    <>
      <h1 className="mb-6 text-5xl font-extrabold">
        Settings
      </h1>
      <section className="max-w-lg">
        <Card>
          <h2 className="text-3xl font-bold">
            User Profile
          </h2>
          <p>
            Change your profile picture, account name, etc.
          </p>

          <Label htmlFor="nameInput">
            Name
          </Label>
          <TextInput
            id="nameInput"
            type="text"
            value={'John Doe'}
            disabled={true}
          />
          <Label htmlFor="emailInput">
            Email
          </Label>
          <TextInput
            id="emailInput"
            type="email"
            value={'j.doe@example.com'}
            disabled={true}
          />

          <Label htmlFor="photoInput">
            Upload file
          </Label>
          <FileInput
            id="photoInput"
            helperText="A profile picture is useful to identify which account you are signed into"
            disabled={true}
          />

          <div className="grid justify-items-end">
            <Button disabled={true}>
              Save
            </Button>
          </div>
        </Card>
      </section>
    </>
  );
}

SettingsPage.getLayout = (page: React.ReactNode) => (
  <Layout title="Settings">{page}</Layout>
);
