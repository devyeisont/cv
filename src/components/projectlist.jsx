import { useRef, useEffect } from "react";

export default function ProjectList({ projects }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY * 10,
          behavior: "smooth",
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);

  const parseToColombianDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("es-CO", {
      timeZone: "America/Bogota",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto px-4">
      <div className="ml-3 flex flex-col gap-3 mx-auto  mt-10">
        <h2 className=" font-bold text-3xl text-gray-800 ">
          📂 Proyectos públicos y privados
        </h2>
        <p className="text-lg leading-relaxed text-slate-500 ">
          La información de cada proyecto depende de la visibilidad, si es
          público o privado. En los proyectos privados, solo se puede ver
          imágenes y videos de la implementación. Para más información, puedes {" "}
          <a
            href="/contact"
            className="hover:underline font-medium text-blue-600">
            contactarme
          </a>{" "}
          📩.
        </p>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-6 py-4 px-4 mt-12 scrollbar-hide"
        aria-label="Lista de proyectos con desplazamiento horizontal">
        {projects.map((project, index) => {
          return (
            <a
              key={index}
              href={`/projects/${project.slug}`}
              className="flex-none w-80 group hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden">
              <div className="w-full aspect-square overflow-hidden">
                <img
                  src={project.data.image.src}
                  alt={project.data.image.alt}
                  sizes="(max-width: 800px) 100vw, 400px"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover object-center transition-transform duration-300 transform group-hover:scale-105"
                />
              </div>

              <div className="mt-4 text-center p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {project.title}
                </h2>
                <h3 className="text-sm text-slate-500">
                  {parseToColombianDate(project.data.publishDate)}
                </h3>
              </div>
            </a>
          );
        })}
      </div>

      <div className="text-center mt-6 text-sm text-gray-500">
        🖱️ Usa el scroll del ratón o 🖐️ desliza con dos dedos para explorar más
        proyectos.
      </div>
    </div>
  );
}
