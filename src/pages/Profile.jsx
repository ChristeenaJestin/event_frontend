import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import * as userApi from "../api/userApi";
import useAuth from "../hooks/useAuth";
import { normalizeUser } from "../utils/helpers";

function Profile() {
  const { user, updateUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profile = await userApi.getProfile();

      const normalized = normalizeUser(profile);

      setForm({
        name: normalized.name,
        email: normalized.email,
      });

     updateUser(normalized);
    } catch (err) {
      console.error(err);

      if (user) {
        setForm({
          name: user.name,
          email: user.email,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    setSaving(true);
    setSuccess("");
    setError("");

    try {
      const updated = await userApi.updateProfile({
  name: form.name,
});

const normalized = normalizeUser(updated);

updateUser(normalized);

setForm({
  name: normalized.name,
  email: normalized.email,
});
      setSuccess("Profile updated successfully.");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Could not update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout search={false}>
        <Loader label="Loading profile..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      search={false}
      breadcrumb={
        <>
          Account
          <span style={{ color: "var(--ink)" }}>
            {" "}
            / Profile
          </span>
        </>
      }
    >
      <div style={{ maxWidth: 720 }}>
        <div className="eyebrow">ACCOUNT</div>

        <h1
          className="h1"
          style={{
            fontSize: 28,
            marginTop: 8,
          }}
        >
          Your profile
        </h1>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            margin: "28px 0",
            padding: 22,
            border: "1px solid var(--hairline)",
            borderRadius: 14,
            background: "var(--surface)",
          }}
        >
          <div
            className="avatar"
            style={{
              width: 64,
              height: 64,
              fontSize: 22,
            }}
          >
            {user?.initials || "U"}
          </div>

          <div>
            <div
              style={{
                fontWeight: 600,
                fontSize: 18,
              }}
            >
              {form.name}
            </div>

            <div
              style={{
                color: "var(--slate)",
                fontSize: 14,
              }}
            >
              {form.email}
            </div>

            <div
              style={{
                color: "var(--indigo)",
                fontSize: 12,
                marginTop: 4,
                fontWeight: 600,
              }}
            >
              {user?.role}
            </div>
          </div>

          <div style={{ flex: 1 }} />

          <Button variant="secondary">
            Change photo
          </Button>
        </div>

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSave}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <Input
            label="Full name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <Input
            label="College email"
            value={form.email}
            readOnly
          />

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            <Button
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default Profile;