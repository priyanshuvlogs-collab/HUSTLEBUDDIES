interface Member {
  name: string;
  role: string;
  bio: string;
  photo: string;
}

/** Neutral abstract avatar used until real team photos are supplied. */
function Avatar() {
  return (
    <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden="true">
      <rect width="80" height="80" fill="#1a1d28" />
      <circle cx="40" cy="31" r="14" fill="#2c3142" />
      <path d="M12 76c3-16 15-24 28-24s25 8 28 24" fill="#2c3142" />
    </svg>
  );
}

export function TeamCard({ member }: { member: Member }) {
  return (
    <li className="rounded-card border border-line bg-bg-elevated/80 p-6 backdrop-blur-sm">
      <div className="h-20 w-20 overflow-hidden rounded-2xl">
        {member.photo ? (
          <img
            src={member.photo}
            alt={`Portrait of ${member.name}`}
            width={80}
            height={80}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <Avatar />
        )}
      </div>
      <h4 className="mt-5 font-heading text-lg font-semibold text-text-primary">{member.name}</h4>
      <p className="text-sm text-accent">{member.role}</p>
      <p className="mt-3 text-sm text-text-muted">{member.bio}</p>
    </li>
  );
}
