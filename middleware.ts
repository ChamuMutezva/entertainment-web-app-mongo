export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/all", "/movies", "/tvSeries", "/bookmarked"],
};
