import Link from "next/link";
import Logout from "./admin/Logout";
import ContentContainer from "./Container";

type NavigationProps = {
  title: string;
  subtitle: string;
  link: {
    href: string;
    title: string;
  };
  isAdminArea: boolean;
};

export default function Navigation({
  title,
  subtitle,
  link,
  isAdminArea,
}: NavigationProps) {
  return (
    <ContentContainer>
      <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 capitalize">
            {title}
          </h1>
          <p className="text-gray-600 mt-1">{subtitle}</p>
        </div>
        <nav>
          <div className="flex items-center gap-4">
            <Link
              href={link.href}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {link.title}
            </Link>
            {isAdminArea && <Logout />}
          </div>
        </nav>
      </header>
    </ContentContainer>
  );
}
