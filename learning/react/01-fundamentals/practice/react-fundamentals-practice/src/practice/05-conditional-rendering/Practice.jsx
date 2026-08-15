function UserStatus({ name, isLoggedIn, isAdmin }) {
  return (
    <section className="user-status">
      <h2>{name}</h2>
      <p>{isLoggedIn === true ? "Logged In" : "Guest"}</p>
      {isLoggedIn && <button>Logout</button>}
      {isAdmin && <button>Admin Menu</button>}
    </section>
  );
}

function ConditionalRenderingPractice() {
  return (
    <section>
      <UserStatus name="JIHUN" isLoggedIn={true} isAdmin={true} />
      <UserStatus name="MINJI" isLoggedIn={true} isAdmin={false} />
      <UserStatus name="YUNA" isLoggedIn={false} isAdmin={false} />
    </section>
  );
}

export default ConditionalRenderingPractice;
