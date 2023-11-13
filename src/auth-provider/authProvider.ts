import { AuthBindings } from "@refinedev/core";

const mockUsers = [{ email: "meow@gmail.com" }, { email: "fmeow@gmeow.com" }];

const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    const user = mockUsers.find((item) => item.email === email);

    if (user) {
      localStorage.setItem("auth", JSON.stringify(user));

      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        message: "Login error",
        name: "Invalid email or password",
      },
    };
  },
  check: async () => {
    const user = localStorage.getItem("auth");

    if (user) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
      error: {
        message: "Check failed",
        name: "Authorized",
      },
    };
  },

  logout: async () => {
    localStorage.removeItem("auth");
    return {
      success: true,
      redirectTo: "/login",
    };
  },

  onError: async (error) => {
    if (error.status === 401 || error.status === 403) {
      return {
        logout: true,
        redirectTo: "/login",
        error,
      };
    }

    return {};
  },

  getPermissions: () => {
    const user = localStorage.getItem("auth");

    if (user) {
      const { roles } = JSON.parse(user);

      return roles;
    }

    return null;
  },

  getIdentity: async () => {
    const user = localStorage.getItem("auth");

    if (user) {
      const { email, role } = JSON.parse(user);

      return { email, role };
    }

    return null;
  },

  register: async ({ email }) => {
    const user = mockUsers.find((user) => user.email === email);

    if (user) {
      return {
        success: false,
        error: {
          name: "Register error",
          message: "User already exists",
        },
      };
    }

    mockUsers.push({ email });

    return { success: true, redirectTo: "/login" };
  },

  forgotPassword: async ({ email }) => {
    // if operation is success
    return {
      success: true,
      redirectTo: "/login",
    };
  },

  updatePassword: async ({ password }) => {
    // update the user's password here

    // if request is successful
    return {
      success: true,
      redirectTo: "/login",
    };
  },
};

export default authProvider;
