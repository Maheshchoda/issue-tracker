import { auth } from '@/app/auth';

export default auth((req) => {
  console.log(!!req.auth);
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
