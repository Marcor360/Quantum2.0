import React from "react";
import MouseParticles from "../components/MouseParticles";

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const name = data.get("name") || "";
  const email = data.get("email") || "";
  const message = data.get("message") || "";

  const subject = encodeURIComponent("Mensaje de contacto");
  const body = encodeURIComponent(
    `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`
  );
  window.location.href = `mailto:marcorulfo100@gmail.com?subject=${subject}&body=${body}`;
};

const Contacto: React.FC = () => {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-12">
      {/* Partículas de fondo */}
      <MouseParticles />
      <section className="relative z-10 w-full max-w-3xl bg-black/70 backdrop-blur-md text-white p-6 sm:p-10 rounded-lg font-subjectivity">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">Contáctanos</h1>
        <p className="text-center mb-8 text-sm sm:text-base">
          ¿Tienes preguntas o deseas más información? Completa el formulario y
          un especialista se pondrá en contacto contigo.
        </p>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full rounded-md p-2 bg-white/10 border border-white/20 focus:outline-none"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded-md p-2 bg-white/10 border border-white/20 focus:outline-none"
              placeholder="tucorreo@ejemplo.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full rounded-md p-2 bg-white/10 border border-white/20 focus:outline-none"
              placeholder="¿Cómo podemos ayudarte?"
            />
          </div>

          <button
            type="submit"
            className="bg-[#ff6ef3] hover:bg-[#ff42e4] text-black font-bold py-2 px-4 rounded transition-colors"
          >
            Enviar
          </button>
        </form>
      </section>
    </main>
  );
};

export default Contacto;