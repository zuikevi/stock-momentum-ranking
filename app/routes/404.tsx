import { Link } from '@remix-run/react';

export default function NotFound() {
    return (
        <div>
            <h1>404 - Not Found</h1>
            <Link to="/">Go back home</Link>
        </div>
    );
}