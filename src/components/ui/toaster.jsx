function _optionalChain(ops) {
  let lastAccessLHS = undefined;
  let value = ops[0];
  let i = 1;
  while (i < ops.length) {
    const op = ops[i];
    const fn = ops[i + 1];
    i += 2;
    if ((op === "optionalAccess" || op === "optionalCall") && value == null) {
      return undefined;
    }
    if (op === "access" || op === "optionalAccess") {
      lastAccessLHS = value;
      value = fn(value);
    } else if (op === "call" || op === "optionalCall") {
      value = fn((...args) => value.call(lastAccessLHS, ...args));
      lastAccessLHS = undefined;
    }
  }
  return value;
}
("use client");

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from "@chakra-ui/react";

// ====== CUSTOM TOASTER SETUP ======
export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
});

// ✅ Handle token error secara global
const rawError = toaster.error;

toaster.error = ({
  title = "Gagal",
  description = "Terjadi kesalahan",
  ...rest
}) => {
  const tokenErrors = [
    "Token required",
    "Invalid token format",
    "jwt expired",
    "jwt malformed",
    "jwt revoked",
  ];

  if (tokenErrors.includes(description)) {
    rawError({
      title: "Login Diperlukan",
      description: "Silakan login terlebih dahulu untuk melanjutkan.",
      status: "error",
      duration: 3000,
      meta: { closable: true },
    });

    // Hapus token dan redirect ke /login
    setTimeout(() => {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }, 1500);

    return;
  }

  // Jika bukan error token, jalankan normal
  rawError({ title, description, ...rest });
};

// ====== TOASTER COMPONENT ======
export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => {
          const isLoading = toast.type === "loading";

          return (
            <Toast.Root
              width={{ md: "sm" }}
              bg={isLoading ? "yellow.500" : undefined}
              color={isLoading ? "white" : undefined}
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" color="orange.500" />
                  <Stack gap="1" flex="1" maxWidth="100%">
                    {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
                    {toast.description && (
                      <Toast.Description>{toast.description}</Toast.Description>
                    )}
                  </Stack>
                </>
              ) : (
                <>
                  <Toast.Indicator />
                  <Stack gap="1" flex="1" maxWidth="100%">
                    {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
                    {toast.description && (
                      <Toast.Description>{toast.description}</Toast.Description>
                    )}
                  </Stack>
                  {toast.action && (
                    <Toast.ActionTrigger>
                      {toast.action.label}
                    </Toast.ActionTrigger>
                  )}
                  {_optionalChain([
                    toast,
                    "access",
                    (_) => _.meta,
                    "optionalAccess",
                    (_2) => _2.closable,
                  ]) && <Toast.CloseTrigger />}
                </>
              )}
            </Toast.Root>
          );
        }}
      </ChakraToaster>
    </Portal>
  );
};
