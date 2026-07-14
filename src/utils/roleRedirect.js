export function getRoleBasedRedirect(role) {
  switch (role) {
    case "ROLE_JOB_SEEKER":
      return "/"
    case "ROLE_EMPLOYER":
      return "/employer"
    case "ROLE_ADMIN":
      return "/admin"
    default:
      return "/login"
  }
}
