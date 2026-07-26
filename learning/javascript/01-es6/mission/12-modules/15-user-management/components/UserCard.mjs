export default function UserCard({ id, name, role }) {
  return `
<article>
  <h1>${id}</h1>
  <h2>${name}</h2>
  <p>${role}</p>
</article>`;
}
