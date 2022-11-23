// Create a new NoteService class which takes a file as a dependency, this means whenever we are creating new instances of the noteService, we need to pass in a path to a file (this is the file that we will read, write and edit etc.)
class NoteService {
  constructor(knex) {
    this.knex = knex;
  }

  // List note is a function which is very important for the application, it retrieves the notes for a specific user. The user is accessed via req.auth.user within our router.
  list(user) {
    //1st way
    return this.knex("users")
      .select("note.id", "note.content")
      .join("note", "users.id", "note.user_id")
      .where("username", user)
      .orderBy("id", "asc");

    //2nd way
    // return this.knex("users")
    //   .select("id")
    //   .where("username", user)
    //   .first()
    //   .then((id) =>
    //     this.knex("note").select("id", "content").where("user_id", id)
    //   );
  }

  // This method add notes updates the users notes, by adding the new note to this.notes, it then calls this.write, to update our JSON file with the newest notes.
  add(note, user) {
    return this.knex("users")
      .select("id")
      .where("username", user)
      .first()
      .then(({ id }) => {
        console.log("id", id);
        console.log("note", note);
        return this.knex("note").insert({ content: note, user_id: id });
      });
  }

  // This method will be used to update a specific note in our application, it also handles some errors for our application. Then it calls this.write to update the JSON file.
  update(id, note) {
    return this.knex("note").update({ content: note }).where({ id });
  }

  // This method will remove a particular note from our this.notes. Then it calls this.write to update our JSON file.
  remove(id) {
    return this.knex("note").del().where({ id });
  }
}

module.exports = NoteService;
