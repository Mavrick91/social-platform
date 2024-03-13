import React from "react";

type Props = {
	children: React.ReactNode;
};

export default function UnauthenticatedLayout({ children }: Props) {
	return <div className="flex justify-center items-center grow">{children}</div>;
}
