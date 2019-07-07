"use strict";
const Mail = use("Mail");

class PizzariaEmail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1;
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return "PizzariaEmail-job";
  }

  // This is where the work is done.
  async handle({ user, dateFormat, hourFormat }) {
    //console.log("PizzariaEmail-job started");
    //console.log(`Job: ${PizzariaEmail.key}`);
    await Mail.send(
      ["emails.confirmar_pedido"],
      {
        user: user.username,
        date: dateFormat,
        hour: hourFormat
      },
      message => {
        message
          .to(user.email)
          .from("bins@dbins.com.br", "Admin | BINS")
          .subject("Confirmação de pedido na Pizzaria Don Juan!");
      }
    );
  }
}

module.exports = PizzariaEmail;
