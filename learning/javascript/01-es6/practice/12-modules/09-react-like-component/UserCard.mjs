function UserCard({ name, role }) {
  return `
<article>
    <h2>${name}</h2>
    <p>${role}</p>
</article>
`;
}

export default UserCard;
