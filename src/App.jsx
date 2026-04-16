import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronDown, Menu, X, Mail, MapPin, Clock, Shield, Zap, MessageCircle, FileText, Building2, Landmark, ScrollText, Store, Megaphone, ArrowRight, CheckCircle2, AlertTriangle, ChevronLeft, Star, Users, Globe, Smartphone, ArrowDown, Send, Search, Upload, CircleDollarSign, BadgeCheck, ShieldAlert, Timer, Truck, Lock, XCircle, Ban, Scale, Gavel, FileWarning, CalendarX, Receipt, Siren, Package, Eye } from "lucide-react";

const WA = "https://wa.me/5492214886197";
const wl = (m) => `${WA}?text=${encodeURIComponent(m)}`;

// ─── DATA WITH HUMAN QUESTIONS + SEO TERMS ──────────────────────────────────

const SERVICES = [
  { id: "registrales", icon: Landmark, title: "Servicios Registrales", scope: "PBA", desc: "Estudio de título, informes de dominio, cesión, inhibición e índice de titulares", color: "#3B6B8A",
    subs: [
      { id: "informes", title: "Informes Registrales", desc: "Informes oficiales ante el RPBA sobre la situación jurídica de personas e inmuebles",
        landings: [
          { id: "dominio", title: "Informe de Dominio",
            seoTitle: "Informe de Dominio en La Plata y PBA | Gestor La Plata",
            pregunta: "¿Quién es el dueño y cuál es la situación del inmueble?",
            tagline: "Informe de Dominio",
            intro: "Gestionamos tu informe de dominio en toda la Provincia de Buenos Aires. Confirmá quién es el titular real y si existen embargos, hipotecas o restricciones antes de comprar, vender o iniciar una sucesión.",
            wa: "Hola, quiero presupuesto para un Informe de Dominio.", waDatos: "Hola, quiero solicitar un Informe de Dominio. Les envío los datos.", waAsesor: "Hola, estoy evaluando solicitar un Informe de Dominio. ¿Podrían asesorarme?",
            datosGroups: [{ label: "Inmueble matriculado (Folio Real)", icon: "🏢", items: ["Titular registral / Partido", "Matrícula / Designación del bien", "Nomenclatura catastral"] }, { label: "Inmueble no matriculado (Folio antiguo)", icon: "📚", items: ["Folio y año / Partido / Titular", "Designación del bien / Nomenclatura catastral", "Medidas y linderos"] }],
            plazos: [{ tipo: "Simple", tiempo: "7 a 10 días hábiles", icon: Clock }, { tipo: "Urgente", tiempo: "2 a 5 días hábiles", icon: Zap }],
            entrega: ["Titular/es actuales y porcentaje de titularidad", "Embargos, medidas cautelares e hipotecas vigentes", "Datos completos de inscripción", "Informe detallado de la situación del inmueble", "Documentación oficial"],
            riesgos: [{ text: "Comprar un inmueble con un embargo activo.", icon: Lock }, { text: "Asumir una hipoteca o deuda desconocida.", icon: CircleDollarSign }, { text: "Vendedor sin el 100% de la titularidad.", icon: ShieldAlert }, { text: "Fracasar en la escritura, perdiendo señas en dólares.", icon: XCircle }],
            review: { text: "El trabajo de Santiago es impecable. Consiguió un acta que buscaba hace más de 6 meses en 2 días. 100% recomendable.", author: "Dolores Zapatel", rubro: "Particular" },
            faq: [
              { q: "¿Qué es un Informe de Dominio y para qué sirve?", a: "El Informe de Dominio es un documento oficial emitido por el Registro de la Propiedad Inmueble de la Provincia de Buenos Aires (RPBA) que acredita quién es el titular registral de un inmueble, si tiene inscripta alguna hipoteca, embargo, medida cautelar u otra restricción. Es la herramienta fundamental para verificar la situación jurídica real de una propiedad antes de comprar, vender, iniciar una sucesión, aceptarla como garantía o realizar cualquier operación inmobiliaria." },
              { q: "¿En qué se diferencia del Informe de Anotaciones Personales?", a: "El Informe de Dominio recae sobre el inmueble: muestra todo lo inscripto sobre esa propiedad (titulares, hipotecas, embargos). El Informe de Anotaciones Personales recae sobre la persona: muestra si esa persona tiene inhibiciones o cesiones de herencia inscriptas. En operaciones inmobiliarias se suelen pedir los dos, porque incluso si el inmueble está impecable, si el titular está inhibido no puede vender." },
              { q: "¿Cuál es la vigencia del Informe de Dominio?", a: "El Informe de Dominio tiene una vigencia de 90 días corridos desde la fecha de solicitud. Pasado ese plazo, la información deja de considerarse actualizada y para la mayoría de las operaciones (escrituración, presentación judicial, aceptación de garantías) hay que solicitar un informe nuevo. Si tu operación se va a concretar cerca del vencimiento, lo ideal es pedir el informe unos días antes de la firma." },
              { q: "¿Puedo pedir un Informe de Dominio aunque no sea el titular?", a: "Sí. El Informe de Dominio es información pública de acceso libre. Cualquier persona puede solicitarlo sin necesidad de acreditar interés legítimo ni vínculo con la propiedad. Solo necesitás los datos del inmueble que figuran en la escritura (titularidad, partido, matricula, nomenclatura catastral, designación del bien." },
              { q: "¿Qué pasa si el inmueble no está matriculado?", a: "Los inmuebles antiguos (anteriores a 1979 en la mayoría de los casos) se rigen por el sistema de Folio Cronológico (Folio antiguo), no por Folio Real. Para estos casos necesitamos otros datos: folio, año, partido, titular, designación del bien, superficie, medidas y linderos. Lo gestionamos igual, solo cambia el procedimiento de búsqueda." },
              { q: "¿Qué diferencia hay entre Informe de Dominio Simple y Urgente?", a: "La diferencia es solo el tiempo de entrega. El trámite Simple demora entre 7 y 10 días hábiles. El Urgente entre 2 y 5 días hábiles. El contenido del informe es idéntico: ambos son emitidos por el RPBA con la misma validez oficial. La diferencia de costo se justifica por la prioridad de procesamiento que le asigna el Registro." },
              { q: "¿El Informe de Dominio sirve para escriturar?", a: "Sí, es uno de los documentos obligatorios en toda escritura traslativa de dominio. El escribano actuante necesita el informe vigente para verificar la situación del inmueble al momento de la firma. Generalmente el escribano solicita también el Certificado de Dominio (que tiene reserva de prioridad por 15 días), pero el Informe previo se usa para la negociación y el boleto." },
              { q: "¿El informe incluye los planos del inmueble?", a: "No. El Informe de Dominio es un documento registral que muestra información jurídica (titularidad, gravámenes, inscripciones). Los planos son catastrales y se tramitan ante ARBA (plancheta catastral, cédula parcelaria, copia de plano). Si necesitás ambos tipos de documentación, podemos gestionarlos en paralelo." },
              { q: "¿Qué hago si el Informe muestra embargos o hipotecas?", a: "Depende del tipo de operación y de la situación. Una hipoteca puede cancelarse al momento de la escritura con parte del precio de venta. Un embargo suele requerir gestión judicial para su levantamiento. Nuestra recomendación siempre es no firmar boleto ni entregar señas sin antes haber visto el informe y consultado con un escribano o abogado sobre cómo resolver las inscripciones activas." },
              { q: "¿El trámite es 100% online?", a: "Sí. No necesitás ir a ninguna oficina ni mandar documentación física. Nos pasás los datos del inmueble por WhatsApp, coordinamos el pago, gestionamos el informe ante el RPBA y te lo enviamos en PDF oficial. Cubrimos toda la Provincia de Buenos Aires desde La Plata." },
            ],
          },
          { id: "titularidad", title: "Índice de Titularidad",
            seoTitle: "Índice de Titularidad en La Plata y PBA | Gestor La Plata",
            pregunta: "¿Tiene propiedades a su nombre?",
            tagline: "Índice de Titularidad",
            intro: "Verificá si una persona tiene inmuebles inscriptos a su nombre en toda la Provincia de Buenos Aires. Búsqueda de inmuebles por persona, ideal para sucesiones, divorcios, juicios o verificación de garantías.",
            wa: "Hola, quiero presupuesto para Índice de Titularidad.", waDatos: "Hola, quiero solicitar Índice de Titularidad. Les envío datos.", waAsesor: "Hola, quiero consultar sobre un Índice de Titularidad.",
            datos: ["Personas Físicas: Nombre completo y DNI", "Personas Jurídicas: Denominación social y CUIT", "Indicar si búsqueda provincial o por partido"],
            plazos: [{ tipo: "Simple", tiempo: "7 a 10 días hábiles", icon: Clock }, { tipo: "Urgente", tiempo: "2 a 5 días hábiles", icon: Zap }, { tipo: "Express", tiempo: "24 hs", icon: Timer }],
            entrega: ["Si registra bienes a su nombre", "Datos de las partidas encontradas", "Jurisdicción de inscripción", "Resultado negativo si no posee titularidades", "Documentación oficial"],
            riesgos: [{ text: "Omitir bienes en una sucesión.", icon: FileWarning }, { text: "Aceptar garantías falsas en alquileres.", icon: ShieldAlert }, { text: "Desconocer el patrimonio real de una persona.", icon: Eye }, { text: "Errores en liquidaciones de bienes o divorcios.", icon: Scale }],
            review: { text: "Me solucionó un trámite de hace meses en 1 hora. Un genio total.", author: "Valentina Mazzucchelli", rubro: "Particular" },
            faq: [
              { q: "¿Qué es el Índice de Titularidad y para qué sirve?", a: "El Índice de Titularidad es una búsqueda oficial ante el Registro de la Propiedad Inmueble de la Provincia de Buenos Aires que revela si una persona física o jurídica tiene inmuebles inscriptos a su nombre. Se usa en sucesiones para identificar el patrimonio del causante, en divorcios para la liquidación de bienes, en juicios laborales o comerciales para verificar solvencia, y en alquileres para validar garantías propietarias. A diferencia del Informe de Dominio (que parte del inmueble), el Índice parte de la persona y devuelve todas las propiedades asociadas." },
              { q: "¿La búsqueda es en toda la Provincia o solo en un partido?", a: "Se puede pedir provincial (abarca los 135 partidos de la Provincia de Buenos Aires) o acotada a un partido específico. La búsqueda provincial es la más completa y es la que recomendamos en sucesiones, juicios de divorcio y verificaciones patrimoniales serias. La búsqueda por partido sirve cuando ya sabés que los bienes están en una jurisdicción determinada. Si tenés dudas, conviene ir por la provincial." },
              { q: "¿Qué datos necesito aportar?", a: "Para personas físicas: nombre y apellido completos, DNI y fecha de nacimiento. Para personas jurídicas: denominación social y CUIT. Cuanta más precisión en los datos, más confiable es el resultado. Nombres con variantes ortográficas, casos de homonimia o personas con nombres muy comunes pueden generar resultados parciales: en esos casos ampliamos la búsqueda con DNI + fecha de nacimiento para filtrar." },
              { q: "¿Qué información me entrega el informe?", a: "El informe oficial del RPBA devuelve el listado de inmuebles inscriptos a nombre de la persona buscada, con los datos de cada partida: partido, matrícula o designación, nomenclatura catastral y porcentaje de titularidad (cuando es compartida). Si la persona no tiene bienes a su nombre, el informe devuelve resultado negativo, lo cual también es un documento oficial válido para presentar en juicios o sucesiones como prueba de ausencia de patrimonio." },
              { q: "¿Sirve para una sucesión?", a: "Sí, es uno de los documentos más usados en sucesiones. Los abogados sucesorios lo piden al inicio del trámite para identificar qué inmuebles del causante van a formar parte del acervo hereditario. También se usa cuando los herederos sospechan que el causante tenía bienes no declarados en vida. Un resultado provincial da tranquilidad de haber identificado todo el patrimonio inmobiliario en PBA." },
              { q: "¿Cuál es la diferencia entre Simple, Urgente y Express?", a: "Solo cambia el plazo de entrega, no el contenido. El Simple demora 7 a 10 días hábiles. El Urgente, 2 a 5. El Express, 24 horas. Todos son informes oficiales del RPBA con la misma validez jurídica. Elegís según la urgencia de la operación: para juicios con plazos procesales ajustados o audiencias inminentes conviene el Express; para planificación tranquila, el Simple alcanza." },
              { q: "¿Cuál es la vigencia del informe?", a: "90 días corridos desde la fecha de solicitud. Pasado ese plazo, la información deja de considerarse actualizada para la mayoría de los usos procesales y hay que pedir un informe nuevo. Si tu audiencia o escritura se va a concretar cerca del vencimiento, lo ideal es pedirlo unos días antes de la fecha clave para que llegue vigente." },
              { q: "¿Qué diferencia hay con el Informe de Anotaciones Personales?", a: "Son complementarios. El Índice de Titularidad te dice qué bienes tiene la persona. El Informe de Anotaciones Personales te dice si esa persona está inhibida o si cedió derechos hereditarios (restricciones que impiden vender o disponer). En operaciones inmobiliarias y verificaciones patrimoniales serias se piden los dos: con el Índice sabés qué tiene, con Anotaciones sabés si puede disponer de lo que tiene." },
              { q: "¿Puedo pedirlo sobre cualquier persona?", a: "Sí. La información registral es pública y no se requiere acreditar interés legítimo ni vínculo con la persona buscada. Cualquiera puede solicitar el informe aportando los datos. Esto es lo que permite usar el Índice como herramienta de verificación patrimonial en contextos comerciales (previo a una operación), laborales (garantías de alquiler) o judiciales (embargos preventivos)." },
              { q: "¿El trámite es 100% digital?", a: "Sí. Nos pasás los datos de la persona por WhatsApp, coordinamos el pago, gestionamos el informe ante el RPBA y te lo enviamos en PDF oficial. Cubrimos toda la Provincia de Buenos Aires desde La Plata sin que tengas que moverte de tu casa u oficina. Si necesitás lote grande (ej: estudios jurídicos con varias búsquedas por mes), trabajamos con tarifas diferenciadas." },
            ],
          },
          { id: "anotaciones", title: "Anotaciones Personales",
            seoTitle: "Informe de Anotaciones Personales en PBA | Gestor La Plata",
            pregunta: "¿Puede vender o tiene alguna traba legal?",
            tagline: "Informe de Anotaciones Personales",
            intro: "Verificá si una persona tiene inhibiciones o cesiones de herencia que le impidan vender, comprar o escriturar. Fundamental antes de firmar cualquier contrato, boleto o escritura.",
            wa: "Hola, quiero presupuesto para Anotaciones Personales.", waDatos: "Hola, quiero solicitar Anotaciones Personales. Les envío datos.", waAsesor: "Hola, quiero consultar sobre Anotaciones Personales.",
            datosGroups: [{ label: "Variante INHIBICIÓN", icon: "🔒", items: ["Verifica prohibición judicial de vender o gravar bienes"] }, { label: "Variante CESIÓN", icon: "🔄", items: ["Verifica si cedió acciones y derechos hereditarios"] }, { label: "Datos necesarios", icon: "📋", items: ["Persona Física: Nombre, fecha de nacimiento, DNI", "Persona Jurídica: Denominación social, CUIT"] }],
            plazos: [{ tipo: "Simple", tiempo: "7 a 10 días hábiles", icon: Clock }, { tipo: "Urgente", tiempo: "2 a 5 días hábiles", icon: Zap }, { tipo: "Express", tiempo: "24 hs", icon: Timer }],
            entrega: ["Si la persona está Inhibida o tiene Cesiones", "Resultado negativo si no hay anotaciones", "Documentación oficial"],
            riesgos: [{ text: "Boleto o escritura nula por inhibición.", icon: Ban }, { text: "Pérdida de seña con vendedor trabado.", icon: CircleDollarSign }, { text: "Fraude en sucesiones por cesiones ocultas.", icon: Gavel }, { text: "Firmar con personas inhabilitadas legalmente.", icon: XCircle }],
            review: { text: "Todo lo que el sistema me dio negativo, él lo resolvió. Buena onda, responsabilidad y confianza.", author: "Flor Pérez Isackson", rubro: "Particular" },
            faq: [
              { q: "¿Qué es el Informe de Anotaciones Personales?", a: "Es un informe oficial del Registro de la Propiedad Inmueble de la Provincia de Buenos Aires que revela si una persona tiene inhibiciones generales de bienes o cesiones de derechos hereditarios inscriptas a su nombre. Una inhibición es una medida judicial que impide vender, gravar o disponer de los bienes registrables; una cesión hereditaria es cuando alguien cedió su porción sucesoria a un tercero. Cualquiera de las dos invalida o complica cualquier operación inmobiliaria o sucesoria en la que la persona pretenda actuar." },
              { q: "¿Cuándo conviene pedirlo?", a: "Antes de cualquier operación inmobiliaria: compra, venta, boleto, escritura. Antes de aceptar una garantía personal en un alquiler. En sucesiones, para verificar si algún heredero cedió sus derechos antes de iniciar el trámite. En juicios y verificaciones patrimoniales. Básicamente, cada vez que una persona vaya a firmar algo comprometiendo un patrimonio, conviene verificar que no esté inhibida." },
              { q: "¿Qué pasa si firmo con alguien inhibido?", a: "La operación puede ser nula o inoponible. Si comprás un inmueble a alguien inhibido, el Registro puede rechazar la inscripción de la escritura y perdés la seña. Si aceptaste a un inhibido como garante de alquiler, la garantía no sirve. En sucesiones, una cesión no declarada puede generar juicios posteriores de herederos aparentes. Verificar antes de firmar cuesta mucho menos que resolver el problema después." },
              { q: "¿Qué diferencia hay entre Inhibición y Cesión?", a: "La variante Inhibición verifica si hay una prohibición judicial vigente de vender o gravar bienes. La variante Cesión verifica si la persona cedió sus derechos hereditarios a un tercero en alguna sucesión. Ambas inscripciones son independientes y se consultan por separado. En operaciones inmobiliarias se pide la variante Inhibición. En sucesiones donde hay dudas, conviene pedir las dos." },
              { q: "¿Qué datos necesito aportar?", a: "Para personas físicas: nombre completo, fecha de nacimiento y DNI. Para personas jurídicas: denominación social y CUIT. La fecha de nacimiento es clave porque filtra casos de homonimia (personas con el mismo nombre). Si no la tenés, podemos igualmente iniciar la búsqueda pero el resultado puede requerir aclaraciones." },
              { q: "¿Qué me devuelve el informe?", a: "El informe detalla el acto inscripto: fecha, jurisdicción, tipo de medida. Si no tiene anotaciones, devuelve un informe negativo oficial del RPBA, que también sirve como prueba documental de que la persona puede disponer libremente de sus bienes." },
              { q: "¿Cuál es la vigencia del informe?", a: "90 días corridos desde la fecha de solicitud. Para escrituras, lo ideal es pedirlo unos días antes de la firma para que llegue vigente al escribano. Para garantías de alquiler o verificaciones comerciales también conviene renovarlo cada vez que se hace una nueva operación." },
              { q: "¿Sirve para escriturar?", a: "Sí, es uno de los documentos que habitualmente el escribano actuante solicita o pide al gestor. Acompaña al Informe de Dominio para cerrar la verificación: el Dominio acredita cómo está el inmueble, Anotaciones acredita cómo está la persona. Los dos juntos dan el cuadro completo para firmar con seguridad." },
              { q: "¿Cuál es la diferencia entre Simple, Urgente y Express?", a: "Solo el plazo. Simple: 7 a 10 días hábiles. Urgente: 2 a 5. Express: 24 horas. El contenido y la validez son idénticos. La elección depende de la urgencia: operaciones inmobiliarias ya cerradas con fecha de escritura fijada suelen requerir Express; verificaciones preventivas tranquilas aceptan Simple." },
              { q: "¿El trámite es 100% digital?", a: "Sí. Nos pasás los datos de la persona por WhatsApp, coordinamos el pago, gestionamos el informe y te lo enviamos en PDF oficial. Cubrimos toda la Provincia de Buenos Aires. Los estudios jurídicos que hacen consultas frecuentes pueden coordinar un sistema de pedidos recurrentes." },
            ],
          },
          { id: "frecuencia", title: "Informe de Frecuencia",
            seoTitle: "Informe de Frecuencia Inmobiliaria en PBA | Gestor La Plata",
            pregunta: "¿Cuánta gente está averiguando por esa propiedad?",
            tagline: "Informe de Frecuencia",
            intro: "Detectá garantías compradas o movimientos sospechosos. Este informe muestra cuántas veces se pidió información sobre un inmueble en los últimos 90 días ante el Registro de la Propiedad.",
            wa: "Hola, quiero presupuesto para Informe de Frecuencia.", waDatos: "Hola, quiero solicitar Informe de Frecuencia.", waAsesor: "Hola, quiero consultar sobre un Informe de Frecuencia.",
            datos: ["Partido donde está inscripto el inmueble", "Número de inscripción de la propiedad", "Unidad funcional/complementaria (si aplica)"],
            plazos: [{ tipo: "Simple", tiempo: "7 a 10 días hábiles", icon: Clock }, { tipo: "Urgente", tiempo: "2 a 5 días hábiles", icon: Zap }],
            entrega: ["Cantidad de informes solicitados en el trimestre", "Fechas de los pedidos realizados", "Documentación oficial"],
            riesgos: [{ text: "Garantías compradas para avalar múltiples contratos.", icon: ShieldAlert }, { text: "Inseguridad en el cobro sin respaldo real.", icon: CircleDollarSign }, { text: "Movimientos sospechosos sobre un inmueble.", icon: Eye }],
            review: { text: "Servicio 10/10. Rapidez, simplicidad y atención diferenciada.", author: "Alexia Rodríguez", rubro: "Particular" },
            faq: [
              { q: "¿Qué es el Informe de Frecuencia Inmobiliaria?", a: "Es un informe oficial del Registro de la Propiedad Inmueble que revela cuántas veces se solicitó información sobre un inmueble determinado en los últimos 90 días, y las fechas de esas consultas. Muestra el movimiento registral de la propiedad: si tuvo muchas consultas en poco tiempo, puede ser señal de garantías compradas, movimientos sospechosos o problemas ocultos." },
              { q: "¿Para qué sirve en una operación inmobiliaria?", a: "Sirve para detectar si el inmueble fue consultado sospechosamente muchas veces, lo cual puede indicar que se está usando para avalar múltiples contratos de alquiler al mismo tiempo (garantías compradas), o que hay interés de varios compradores o acreedores al mismo tiempo. Un número alto de frecuencias en un período corto es una alerta a investigar antes de seguir con la operación." },
              { q: "¿Qué información me devuelve?", a: "Devuelve la cantidad de pedidos de información sobre el inmueble realizados en los últimos 90 días, y las fechas específicas de esas consultas. No informa quiénes pidieron los informes (esa información es confidencial) pero sí el volumen y la distribución temporal, que es lo que permite detectar patrones anómalos." },
              { q: "¿Qué números se consideran normales?", a: "Un inmueble sin operaciones en curso suele tener 0 o 1 consulta en 90 días. Un inmueble en proceso de venta puede tener entre 2 y 5. Más de 5 consultas en poco tiempo, sobre todo si son en fechas muy cercanas entre sí, amerita investigar: puede ser una garantía siendo usada en múltiples contratos, un inmueble con varios interesados simultáneos, o un patrón de fraude." },
              { q: "¿Cuándo es crítico pedirlo?", a: "Cuando recibís un inmueble como garantía de alquiler, sobre todo si el garante tiene varias propiedades y querés verificar que esa no esté respaldando ya otros contratos. Cuando estás por comprar y querés saber si la propiedad está siendo ofrecida a múltiples compradores. En contextos judiciales, cuando hay indicios de fraude o simulación." },
              { q: "¿Qué datos necesito aportar?", a: "Número de partido donde está inscripto el inmueble y número de inscripción de la propiedad. Si es una unidad funcional de PH, también la unidad funcional o complementaria. Los datos son los mismos que usás para un Informe de Dominio: si ya tenés ese informe, con esos datos alcanza." },
              { q: "¿Se puede pedir en toda la Provincia?", a: "Sí, cubrimos toda la Provincia de Buenos Aires desde La Plata. El informe se emite desde el mismo RPBA y tiene validez oficial en cualquier jurisdicción provincial." },
              { q: "¿Cuál es la diferencia entre Simple y Urgente?", a: "Solo el plazo. Simple demora 7 a 10 días hábiles, Urgente 2 a 5. El contenido es idéntico." },
              { q: "¿Qué hago si el informe muestra muchas consultas?", a: "Lo primero es no avanzar con la operación sin investigar. Pedí al titular o a la otra parte una explicación de las consultas recientes. Si es una garantía de alquiler, confirmá que la propiedad no esté garantizando otros contratos vigentes. Si sos comprador, averiguá si hay boletos firmados previamente. En casos de sospecha, conviene sumar un Informe de Dominio actualizado para ver si ya hay inscripciones (embargos, anotaciones de litis) que expliquen las consultas." },
              { q: "¿El trámite es 100% digital?", a: "Sí. Nos pasás los datos del inmueble por WhatsApp, coordinamos el pago, gestionamos el informe ante el RPBA y te lo enviamos en PDF oficial. Es un informe menos conocido que el de Dominio pero igualmente disponible y útil para verificaciones patrimoniales serias." },
            ],
          },
        ]
      },
      { id: "copias", title: "Copias Registrales", desc: "Copias oficiales del Registro, declaratorias y antecedentes",
        landings: [{ id: "copias-reg", title: "Copias Registrales",
          seoTitle: "Copias Registrales en PBA | Gestor La Plata",
          pregunta: "¿Necesitás la historia completa de un inmueble?",
          tagline: "Copias Registrales",
          intro: "Accedé a la información registral completa, actual e histórica. Gestionamos copias oficiales del Registro de la Propiedad para inmuebles matriculados, no matriculados y declaratorias de herederos.",
          wa: "Hola, quiero presupuesto para Copia Registral.", waDatos: "Hola, quiero solicitar Copia Registral.", waAsesor: "Hola, consulta sobre Copia Registral.",
          datosGroups: [{ label: "Inmueble matriculado (Folio Real)", icon: "🏢", items: ["Partido / Matrícula", "Designación del bien / Nomenclatura"] }, { label: "Inmueble no matriculado", icon: "📚", items: ["Folio y año / Partido", "Designación / Medidas y linderos"] }, { label: "Declaratoria de Herederos", icon: "📜", items: ["Partido", "Número de Declaratoria y Año"] }],
          plazos: [{ tipo: "Simple", tiempo: "7 a 10 días hábiles", icon: Clock }, { tipo: "Urgente", tiempo: "2 a 5 días hábiles", icon: Zap }],
          entrega: ["Copia oficial emitida por el RPBA", "Informe detallado de la situación"],
          riesgos: [{ text: "Desconocer embargos o hipotecas ocultas.", icon: Lock }, { text: "No detectar antecedentes relevantes.", icon: Eye }, { text: "Comprar sin información histórica completa.", icon: FileWarning }, { text: "Complicaciones legales en operaciones.", icon: Gavel }],
          review: { text: "Excelente atención y profesionalismo. Calidez humana en el trato. Altamente confiable.", author: "Cliente verificado", rubro: "Particular" },
          faq: [
            { q: "¿Qué son las Copias Registrales y para qué sirven?", a: "Son copias oficiales del Registro de la Propiedad Inmueble que reproducen documentos registrales originales: asientos, matrículas, folios antiguos y declaratorias de herederos. Se usan cuando necesitás la historia registral completa de un inmueble o una sucesión: antecedentes para un estudio de títulos profundo, reconstrucción de cadena titular, verificación de actos registrales anteriores." },
            { q: "¿En qué se diferencian del Informe de Dominio?", a: "El Informe de Dominio es una síntesis actualizada de la situación del inmueble a una fecha. La Copia Registral es la reproducción literal del documento que dio origen a esa situación: el asiento completo con toda la información tal como está asentada. En estudios de títulos profundos o ante dudas sobre una inscripción puntual, la copia oficial es la fuente primaria de verdad." },
            { q: "¿Cuándo conviene pedir una Copia Registral?", a: "Cuando el Informe de Dominio deja dudas sobre un acto inscripto. Cuando un escribano pide verificar los antecedentes de una operación. Cuando se trabaja sobre inmuebles no matriculados (con Folio Cronológico antiguo) donde la información está dispersa. En sucesiones complejas, para acceder a declaratorias de herederos anteriores que no están en el Folio Real actual." },
            { q: "¿Qué datos necesito si el inmueble está matriculado?", a: "Si es un inmueble con Folio Real (matriculado): partido y matrícula. También sirve la designación del bien o la nomenclatura catastral. Con esos datos accedemos al Folio Real actual y pedimos la copia del asiento que te interese." },
            { q: "¿Y si el inmueble no está matriculado?", a: "Los inmuebles anteriores a 1979 (en la mayoría de los partidos) tienen Folio Cronológico antiguo. Ahí necesitamos: folio y año, partido, designación del bien o medidas y linderos. Reconstruir la cadena de un inmueble no matriculado requiere más trabajo de búsqueda y por eso suele tomarnos más tiempo." },
            { q: "¿Se puede pedir copia de una declaratoria de herederos?", a: "Sí. La declaratoria de herederos se inscribe en el RPBA cuando hay inmuebles en la sucesión, y podemos obtener copia oficial aportando el partido, número de declaratoria y año. Esto es útil para sucesiones nuevas sobre herederos que ya tramitaron declaratorias anteriores, o para reconstruir cadenas sucesorias." },
            { q: "¿Cuál es la vigencia de la Copia Registral?", a: "A diferencia del Informe de Dominio que caduca a los 90 días, una Copia Registral es un documento histórico: reproduce un acto pasado y no pierde validez como reproducción del documento original. Sí, si lo necesitás para verificar la situación actual, tenés que complementarlo con un Informe de Dominio vigente." },
            { q: "¿Qué diferencia hay entre Simple y Urgente?", a: "Solo el plazo. Simple: 7 a 10 días hábiles. Urgente: 2 a 5 días. En la práctica, para copias de documentos antiguos el plazo real puede ser mayor porque requieren búsqueda en archivo físico, cosa que el RPBA nos avisa al tomar el pedido." },
            { q: "¿Sirve para escriturar?", a: "Las copias registrales no reemplazan al Informe o Certificado de Dominio que el escribano requiere para escriturar. Sí complementan el trabajo de estudio de título cuando hace falta profundizar en antecedentes o verificar inscripciones no claras. Tu escribano te va a indicar si necesita copias específicas según la complejidad del título." },
            { q: "¿El trámite es 100% digital?", a: "Sí. Nos pasás los datos por WhatsApp, coordinamos el pago, gestionamos la copia ante el RPBA y te la enviamos en PDF oficial. Cubrimos toda la Provincia de Buenos Aires. Para trámites donde el RPBA entrega documentación física, coordinamos el envío por mensajería a tu dirección." },
          ],
        }]
      },
      { id: "investigacion", title: "Investigación y Estudio de Títulos", desc: "Rastreo de antecedentes desde cero",
        landings: [{ id: "estudio-titulo", title: "Estudio de Títulos",
          seoTitle: "Estudio de Títulos Inmobiliarios en PBA | Gestor La Plata",
          pregunta: "¿Datos incompletos? Nosotros rastreamos todo.",
          tagline: "Investigación y Estudio de Títulos Registrales",
          intro: "¿No tenés escritura o la información está incompleta? Nos especializamos en rastrear antecedentes desde cero para reconstruir la historia legal de la propiedad y darte certeza jurídica.",
          wa: "Hola, quiero investigar antecedentes de un inmueble.", waDatos: "Hola, envío datos mínimos para investigación.", waAsesor: "Hola, tengo un caso difícil de estudio de título.",
          datos: ["Dirección exacta del inmueble", "Algún impuesto (ARBA) o partida", "Datos de papeles viejos o informes antiguos", "Cualquier referencia que tengas"],
          plazos: [{ tipo: "Variable", tiempo: "Según cada caso", icon: Clock }],
          entrega: ["Legajo PDF con diagnóstico inmobiliario completo", "Identificación actual del inmueble", "Copias de respaldo encontradas", "Conclusión profesional sobre aptitud para operar"],
          riesgos: [{ text: "Informes negativos por datos incorrectos.", icon: FileWarning }, { text: "Frenos en la escritura por inscripciones pendientes.", icon: Ban }, { text: "Base incompleta para juicio de Usucapión.", icon: Gavel }],
          review: { text: "Si existieran más estrellas así lo haría. Rápido, eficaz y buena onda ante todo.", author: "Camila Sicco", rubro: "Particular" },
          faq: [
            { q: "¿Qué es el Estudio de Títulos?", a: "Es una investigación profunda de la historia registral de un inmueble para determinar si el título es perfecto, observable o con defectos. A diferencia del Informe de Dominio (que muestra la situación actual), el Estudio de Títulos reconstruye la cadena completa de actos desde hace décadas: quiénes fueron los titulares, qué actos se inscribieron, si hay cesiones, donaciones, sucesiones intermedias, y si todo el recorrido es jurídicamente sólido." },
            { q: "¿Cuándo conviene hacer un Estudio de Títulos?", a: "Antes de comprar una propiedad, sobre todo si hay indicios de complejidad: inmuebles heredados con varios causantes, propiedades con boletos antiguos, inmuebles sin escritura, casos donde el vendedor no tiene toda la documentación en orden. También es clave en juicios de usucapión, donde hay que reconstruir la historia del inmueble desde el origen." },
            { q: "¿Qué datos mínimos necesito aportar?", a: "Sirve cualquier referencia: dirección exacta, partida de ARBA, algún impuesto, informes antiguos, papeles viejos del inmueble. Nos especializamos en casos con datos fragmentarios: cuanto menos tengas, más valor agrega el trabajo de investigación." },
            { q: "¿Qué me entrega al finalizar?", a: "Un legajo PDF con diagnóstico inmobiliario completo: identificación actualizada del inmueble, cadena de titularidad reconstruida, copias de respaldo de los actos encontrados, análisis de inscripciones pendientes o irregulares, y conclusión profesional sobre la aptitud del título para operar. Si hay problemas, te indicamos qué pasos dar para subsanarlos." },
            { q: "¿Cuánto tarda?", a: "Depende de la complejidad del caso. Un estudio sobre un inmueble matriculado con documentación completa puede resolverse en 10-15 días hábiles. Un caso de inmueble no matriculado con datos fragmentarios, o una cadena con varias sucesiones, puede llevar 30 días o más. Al recibir los datos te damos un plazo estimado específico para tu caso." },
            { q: "¿Sirve para un juicio de usucapión?", a: "Sí. El Estudio de Títulos es uno de los pilares para iniciar un juicio de usucapión: permite identificar al titular registral actual (demandado), reconstruir si hubo sucesiones intermedias que complican la legitimación pasiva, y documentar la ausencia de actos del titular sobre el inmueble durante el período de prescripción. Tu abogado de usucapión va a necesitar este trabajo como base." },
            { q: "¿Qué pasa si el título tiene defectos?", a: "El estudio los identifica y te damos un diagnóstico. Algunos defectos son subsanables con trámites administrativos (completar inscripciones pendientes, rectificar medidas, inscribir declaratorias atrasadas). Otros son más complejos y requieren acción judicial. Tener el diagnóstico antes de comprar te permite negociar la baja de precio, pedir al vendedor que subsane, o directamente no avanzar." },
            { q: "¿Se puede hacer a distancia?", a: "Sí, cubrimos toda la Provincia de Buenos Aires desde La Plata. Coordinamos por WhatsApp, vos nos pasás toda la documentación que tengas, y el trabajo de investigación lo hacemos nosotros con los contactos y accesos al RPBA y archivos provinciales. La entrega final es un legajo PDF." },
            { q: "¿Por qué no me alcanza con el Informe de Dominio?", a: "El Informe de Dominio es una foto actual: te dice quién figura hoy como titular y qué gravámenes hay inscriptos. Pero no te dice si los actos anteriores son sólidos. Un inmueble puede tener Informe de Dominio \"limpio\" pero una cadena con defectos subyacentes que expliquen por qué el vendedor vende barato o por qué el inmueble no se pudo operar antes. El Estudio de Títulos va más profundo." },
            { q: "¿El trámite es 100% digital?", a: "Sí. Nos pasás los datos por WhatsApp, coordinamos el pago, gestionamos la copia ante el RPBA y te la enviamos en PDF oficial. Cubrimos toda la Provincia de Buenos Aires. Para trámites donde el RPBA entrega documentación física, coordinamos el envío por mensajería a tu dirección." },
          ],
        }]
      },
    ]
  },
  { id: "arba", icon: Building2, title: "ARBA y Catastro", scope: "PBA", desc: "Antecedentes catastrales, copias de plano, valuaciones y mesa de entrada", color: "#3B6B8A",
    subs: [
      { id: "plancheta", title: "Plancheta Catastral y Cédulas", desc: "Documentación gráfica y administrativa ante ARBA", landings: [{ id: "plancheta-l", title: "Plancheta Catastral",
        seoTitle: "Plancheta Catastral ARBA | Gestor La Plata",
        pregunta: "¿Cuánto mide tu lote y cuáles son sus límites?",
        tagline: "Plancheta Catastral y Cédulas",
        intro: "Obtené la información técnica oficial de tu inmueble: croquis del lote, superficies declaradas y antecedentes catastrales. Gestionamos la documentación ante ARBA de forma rápida y digital.",
        wa: "Hola, quiero solicitar Plancheta Catastral.", waDatos: "Hola, envío datos para Plancheta Catastral.", waAsesor: "Hola, consulta sobre documentación catastral.",
        datos: ["Número de Partida Inmobiliaria", "Nomenclatura Catastral completa", "O dirección exacta (nosotros localizamos)"],
        plazos: [{ tipo: "Estándar", tiempo: "24 a 96 hs hábiles", icon: Clock }],
        entrega: ["Plancheta Catastral: croquis oficial del lote", "Cédula Parcelaria: ubicación y superficies", "Informe de Antecedente Catastral"],
        riesgos: [], review: null,
        faq: [
          { q: "¿Qué es la Plancheta Catastral?", a: "La Plancheta Catastral es un documento oficial emitido por ARBA (Agencia de Recaudación de la Provincia de Buenos Aires) que contiene el croquis oficial del lote con sus medidas lineales, superficies declaradas, linderos y nomenclatura catastral. Es la información técnica básica del inmueble según el registro catastral provincial, distinta de la información registral del RPBA." },
          { q: "¿Para qué sirve la Plancheta?", a: "Para cualquier trámite donde necesites conocer las medidas y linderos oficiales del lote: trabajos de arquitectura y construcción, estudios de factibilidad para subdivisiones o unificaciones, trámites de habilitación comercial que requieren superficie del local, operaciones inmobiliarias donde hay que verificar si la superficie declarada coincide con la realidad. Es la base gráfica de cualquier trabajo profesional sobre el inmueble." },
          { q: "¿Qué diferencia hay entre Plancheta y Cédula Parcelaria?", a: "La Plancheta es el croquis gráfico del lote con medidas. La Cédula Parcelaria es un documento complementario que incluye ubicación, superficies declaradas y datos identificatorios. Las dos se piden juntas habitualmente porque se complementan: la Plancheta para ver las medidas, la Cédula para tener los datos registrados. Según el trámite, puede pedirte una o ambas." },
          { q: "¿Qué es el Antecedente Catastral?", a: "Es el informe histórico de los movimientos catastrales del inmueble: subdivisiones, unificaciones, modificaciones de superficie, cambios de nomenclatura. Es útil cuando trabajás sobre un inmueble que tuvo historia catastral (loteos, subdivisiones de PH) y querés entender cómo llegó a su configuración actual." },
          { q: "¿Qué datos necesito aportar?", a: "El óptimo es Partida Inmobiliaria (PBA) o Nomenclatura Catastral completa. Si no tenés esos datos, con la dirección exacta del inmueble podemos localizarlo en los sistemas de ARBA. Los profesionales (arquitectos, agrimensores) habitualmente ya tienen la nomenclatura; los particulares suelen traer solo la partida." },
          { q: "¿Cuánto tarda?", a: "El trámite estándar lo resolvemos en 24 a 96 horas hábiles. ARBA emite la documentación digitalmente y la entrega es rápida. Si hay antecedentes catastrales complejos o datos fragmentarios que requieren investigación previa, puede extenderse, pero te avisamos desde el primer contacto si vemos que el caso requiere más tiempo." },
          { q: "¿La información de la Plancheta es igual a la del Título de Propiedad?", a: "Puede haber diferencias. El título refleja lo que se escrituró. La Plancheta refleja lo que está en el catastro de ARBA. Cuando hubo modificaciones en el inmueble (ampliaciones no declaradas, subdivisiones, mensuras nuevas) la información puede divergir. Detectar estas diferencias antes de operar es importante para evitar problemas en la escritura." },
          { q: "¿Puedo pedir Plancheta de un inmueble que no es mío?", a: "Sí, la información catastral es pública. Podés pedir Plancheta de cualquier inmueble aportando los datos mínimos (partida o nomenclatura). Esto habilita el uso del documento en contextos de due diligence antes de comprar, estudios profesionales sobre linderos, verificación de medidas en operaciones inmobiliarias." },
          { q: "¿El trámite es 100% digital?", a: "Sí. Nos pasás la partida inmobiliaria o dirección por WhatsApp, coordinamos el pago, gestionamos la documentación ante ARBA y te la enviamos en PDF oficial. Cubrimos toda la Provincia de Buenos Aires desde La Plata. Si sos agrimensor o arquitecto con trabajo recurrente, trabajamos con tarifas diferenciadas." },
        ],
        }] },
      { id: "plano", title: "Copia de Plano de Mensura / PH", desc: "Lámina certificada en formato papel", landings: [{ id: "plano-l", title: "Copia de Plano",
        seoTitle: "Copia de Plano de Mensura y PH | Gestor La Plata",
        pregunta: "¿Necesitás el plano oficial de tu propiedad?",
        tagline: "Copia de Plano de Mensura y PH (Certificada)",
        intro: "Accedé al antecedente legal y técnico de tu lote o edificio. Gestionamos láminas certificadas por ARBA en formato papel, tanto planos de mensura como de propiedad horizontal.",
        wa: "Hola, necesito copia de plano.", waDatos: "Hola, envío datos para copia de plano.", waAsesor: "Hola, consulta sobre plano de mi propiedad.",
        datos: ["Número de Plano (ej: 45-12-82)", "Nomenclatura Catastral / Partida Inmobiliaria", "Si no tenés el número, investigamos por vos"],
        plazos: [{ tipo: "Estándar", tiempo: "7 a 15 días hábiles", icon: Clock }],
        entrega: ["Plano de Mensura (Tierra) / PH", "Lámina certificada en formato papel", "Envío por mensajería"],
        riesgos: [], review: null,
        faq: [
          { q: "¿Qué es la Copia de Plano de Mensura?", a: "Es la reproducción certificada por ARBA del plano de mensura registrado sobre un inmueble. El plano de mensura es el documento técnico firmado por un agrimensor matriculado que define oficialmente las medidas, superficies y linderos del lote. La copia de plano es la lámina oficial con valor legal en formato papel, usada para trámites profesionales, operaciones inmobiliarias y procesos judiciales." },
          { q: "¿Y la Copia de Plano de PH?", a: "Es la misma idea pero aplicada a propiedades horizontales (edificios, condominios, lotes en block de PH). El plano de PH define la división del edificio en unidades funcionales y complementarias, con los porcentuales de cada unidad sobre el total. Se usa para operaciones sobre unidades de PH, modificaciones del reglamento, o verificación de la configuración registrada." },
          { q: "¿Para qué sirve tener la Copia?", a: "Para trabajos profesionales (arquitectos, agrimensores, ingenieros) que necesitan la base técnica oficial. Para operaciones inmobiliarias donde hay dudas sobre medidas. Para juicios donde se discute superficie o linderos. Para trámites ante municipios o ARBA que requieren el plano certificado como respaldo técnico." },
          { q: "¿Qué datos necesito aportar?", a: "Lo ideal es el número de plano, que tiene formato partido-número-año (ejemplo: 45-12-82). Si no lo tenés, podemos investigar a partir de la nomenclatura catastral o la partida inmobiliaria. En algunos casos antiguos, localizar el plano requiere búsqueda adicional en los archivos de ARBA, lo cual extiende el plazo." },
          { q: "¿En qué formato se entrega?", a: "Se entrega como lámina certificada en formato papel, con el sello oficial de ARBA. Por la naturaleza del documento (plano de gran tamaño) la entrega no es digital sino física: te lo enviamos por mensajería a tu domicilio en La Plata o coordinamos envío al interior de PBA. Cuando el trámite lo permite, también entregamos copia digital complementaria." },
          { q: "¿Cuánto tarda?", a: "El plazo estándar es de 7 a 15 días hábiles. Depende de si ARBA tiene el plano digitalizado (más rápido) o requiere búsqueda en archivo físico (más tiempo). Planos de décadas recientes suelen estar digitalizados; planos antiguos (pre-años 90) requieren búsqueda manual." },
          { q: "¿Qué diferencia hay entre Plano de Mensura y Plancheta?", a: "La Plancheta es un croquis informativo con las medidas actuales del lote según el catastro. El Plano de Mensura es el documento técnico profesional firmado por el agrimensor que originó esas medidas. El plano es la fuente (documento profesional con firma técnica), la plancheta es el derivado informativo. Para trabajos profesionales se usa el plano; para trámites administrativos básicos, la plancheta alcanza." },
          { q: "¿Sirve para modificaciones posteriores del inmueble?", a: "Sí, es la base técnica para cualquier modificación: subdivisiones, unificaciones, ampliaciones, mensuras actualizadas. Los agrimensores que van a trabajar sobre el inmueble necesitan la copia de plano vigente como punto de partida de su trabajo. Gestionarla antes de contratar al profesional le ahorra tiempo al trabajo técnico." },
          { q: "¿Puedo pedirla de un inmueble que no es mío?", a: "Sí. Los planos registrados en ARBA son información pública accesible con los datos del inmueble. Se puede usar en due diligence previa a compra, análisis de linderos en conflictos vecinales, o cualquier verificación técnica profesional." },
          { q: "¿Cubren toda la Provincia de Buenos Aires?", a: "Sí, trabajamos con planos de los 135 partidos de PBA desde nuestra oficina en La Plata. Nos pasás los datos por WhatsApp, coordinamos el pago, gestionamos ante ARBA y te enviamos la lámina certificada. Si sos agrimensor o arquitecto con trabajo recurrente, trabajamos con tarifas diferenciadas." },
        ],
        }] },
      { id: "valuacion", title: "Certificado de Valuación Fiscal", desc: "Valor impositivo para sucesiones y escrituración", landings: [{ id: "valuacion-l", title: "Valuación Fiscal",
        seoTitle: "Certificado de Valuación Fiscal ARBA | Gestor La Plata",
        pregunta: "¿Cuánto vale tu propiedad para el Estado?",
        tagline: "Certificado de Valuación Fiscal",
        intro: "Acreditá el valor impositivo oficial de tu propiedad ante ARBA. Indispensable para sucesiones, divorcios, escrituraciones y trámites jubilatorios. Lo gestionamos en 24 a 48 horas.",
        wa: "Hola, quiero Valuación Fiscal.", waDatos: "Hola, envío partida para Valuación Fiscal.", waAsesor: "Hola, consulta sobre valuación fiscal.",
        datos: ["Número de Partida Inmobiliaria (PBA)", "Nomenclatura Catastral completa"],
        plazos: [{ tipo: "Estándar", tiempo: "24 a 48 hs hábiles", icon: Clock }],
        entrega: ["Documentación oficial"],
        riesgos: [], review: null,
        faq: [
          { q: "¿Qué es el Certificado de Valuación Fiscal?", a: "Es un documento oficial emitido por ARBA que acredita el valor fiscal de un inmueble: el valor impositivo asignado por el Estado provincial a esa propiedad. Es un dato clave para trámites donde hay que computar el valor del inmueble: sucesiones, divorcios, escrituraciones con escala fiscal, trámites jubilatorios o de pensiones, declaraciones juradas patrimoniales." },
          { q: "¿Es el mismo valor que el valor de mercado?", a: "No. El valor fiscal suele ser inferior al valor de mercado (a veces significativamente). Es una valuación administrativa que ARBA usa para calcular impuestos inmobiliarios. El valor de mercado es lo que se pagaría por el inmueble en una operación real y depende de oferta, demanda, estado, zona. Para trámites se usa el valor fiscal; para operaciones comerciales, el valor de mercado." },
          { q: "¿Para qué sirve en una sucesión?", a: "Es uno de los documentos base para calcular el impuesto a la transmisión gratuita de bienes (cuando aplica) y para el inventario sucesorio. Los abogados sucesorios lo piden al inicio para que los escribanos puedan trabajar con el valor oficial. En algunas jurisdicciones es lo que permite avanzar con la declaratoria de herederos o con la inscripción de la declaratoria sobre los inmuebles." },
          { q: "¿Para qué sirve en un divorcio?", a: "En la liquidación de la sociedad conyugal, para establecer el valor de los bienes inmuebles que forman parte del acervo común. Si bien las partes pueden acordar tasaciones de mercado, la valuación fiscal es el piso oficial y lo que habitualmente se usa en convenios para evitar discusiones." },
          { q: "¿Para qué sirve en una escrituración?", a: "Algunos gravámenes vinculados a la escritura (como impuestos provinciales o municipales) se calculan sobre el valor fiscal. Los escribanos piden el certificado para liquidar correctamente los tributos al momento de escriturar. En operaciones donde el valor de venta es menor al valor fiscal, es la valuación fiscal la que se toma como base imponible." },
          { q: "¿Cuánto tarda?", a: "El trámite estándar lo resolvemos en 24 a 48 horas hábiles. Es uno de los trámites más rápidos de ARBA. Una vez pedido, el certificado se emite digitalmente y te lo enviamos en PDF oficial." },
          { q: "¿Qué datos necesito aportar?", a: "Partida Inmobiliaria de PBA o Nomenclatura Catastral completa. Con cualquiera de los dos accedemos al sistema de ARBA y pedimos el certificado. Si solo tenés la dirección, podemos localizar la partida a partir de ahí, lo que agrega un día hábil al trámite." },
          { q: "¿Cuál es la vigencia del certificado?", a: "Depende del trámite para el cual lo usás. Para escrituraciones, suele requerirse actualizado al año en curso. Para sucesiones o juicios, el juez o escribano te va a indicar si acepta un certificado de un año anterior o si necesita actualizado. Lo recomendable es pedirlo cerca de la fecha de uso." },
          { q: "¿Puedo pedirlo de un inmueble que no es mío?", a: "Sí, los datos de valuación fiscal son públicos. Es útil para due diligence antes de comprar, análisis comparativos, o verificaciones en contextos legales o comerciales." },
          { q: "¿El trámite es 100% digital?", a: "Sí. Nos pasás la partida por WhatsApp, coordinamos el pago, gestionamos el certificado ante ARBA y te lo enviamos en PDF oficial. Cubrimos toda la Provincia de Buenos Aires desde La Plata. Para escribanos y profesionales con uso recurrente, trabajamos con tarifas diferenciadas." },
        ],
        }] },
      { id: "agrimensores", title: "Mesa de Entrada para Agrimensores", desc: "Ingreso, seguimiento y retiro", landings: [{ id: "agrimensores-l", title: "Gestión para Agrimensores",
        seoTitle: "Gestoría para Agrimensores en La Plata | Gestor La Plata",
        pregunta: "¿Sos agrimensor y necesitás delegar la oficina?",
        tagline: "Mesa de Entrada para Agrimensores",
        intro: "Delegá la logística y ganá tiempo de campo. Somos tu nexo profesional ante la Dirección de Catastro: ingresamos, seguimos y retiramos tus trámites por vos.",
        wa: "Hola, soy Agrimensor y quiero delegar trámites.", waDatos: "Hola, soy Agrimensor. Necesito ingresar un trámite.", waAsesor: "Hola, soy profesional. Consulta por gestión.",
        datos: ["Documentación a ingresar", "Datos del expediente (si existe)", "Tipo de trámite y urgencia"],
        plazos: [{ tipo: "Variable", tiempo: "Según complejidad", icon: Clock }],
        entrega: ["Ingreso de documentación en mesa de entrada", "Seguimiento activo del expediente", "Diligenciamiento de reingresos", "Retiro de trámites finalizados"],
        riesgos: [], review: null,
        faq: [],
        }] },
    ]
  },
  { id: "actas", icon: ScrollText, title: "Actas e Inscripciones", scope: "PBA", desc: "Nacimiento, matrimonio, defunción, apostilla y Ley 22.172", color: "#3B6B8A",
    subs: [
      { id: "actas-sub", title: "Actas de Registro Civil", desc: "Partidas en toda la Provincia", landings: [{ id: "actas-l", title: "Búsqueda de Actas",
        seoTitle: "Actas de Nacimiento, Matrimonio y Defunción en PBA | Gestor La Plata",
        pregunta: "¿Necesitás un acta y el sistema online no te la da?",
        tagline: "Búsqueda de Actas en Toda la Provincia",
        intro: "Gestionamos la obtención y búsqueda presencial de actas de nacimiento, matrimonio y defunción en la Casa Central del Registro en La Plata, donde están los libros físicos de toda la provincia.",
        wa: "Hola, necesito un acta de la Provincia.", waDatos: "Hola, envío datos para solicitar un acta.", waAsesor: "Hola, consulta sobre un acta.",
        datosGroups: [{ label: "Con datos precisos (Urgencias)", icon: "🚀", items: ["Foto de acta anterior, o;", "Tomo, Folio, Año y Delegación", "Fecha exacta del hecho"] }, { label: "Sin datos (Servicio de Búsqueda)", icon: "🔍", items: ["Nombre y Apellido completo", "Rango de años aproximado", "Localidad o Partido", "DNI, nombres de padres o referencia útil"] }],
        plazos: [{ tipo: "Simple (con datos)", tiempo: "3 a 5 días hábiles", icon: Clock }, { tipo: "Exprés (con datos)", tiempo: "24 hs", icon: Zap }, { tipo: "Búsqueda (sin datos)", tiempo: "3 a 5 días hábiles", icon: Search }],
        entrega: ["Acta original digitalizada", "Apta para apostillar o presentar en consulados"],
        riesgos: [], review: { text: "Rapidísimo, en 2 días tenía actas que buscaba hace más de 6 meses. De confianza absoluta!", author: "Erci Mungiardo", rubro: "Particular" },
        faq: [
          { q: "¿Qué actas del Registro Civil gestionan?", a: "Actas de nacimiento, matrimonio y defunción de cualquier partido de la Provincia de Buenos Aires. Trabajamos con la Casa Central del Registro de las Personas en La Plata, donde están los libros físicos originales de toda la provincia, lo que nos permite obtener actas que el sistema online no devuelve o que requieren búsqueda manual." },
          { q: "¿En qué casos el sistema online no da el acta?", a: "Casos típicos: libros antiguos no digitalizados, inscripciones con datos incorrectos en el sistema (nombre mal cargado, fecha errónea), delegaciones locales sin conexión digital completa, inscripciones parciales o con enmiendas, actas con daños o tachaduras que el sistema no puede procesar automáticamente. En todos estos casos la búsqueda presencial en los libros originales es la solución." },
          { q: "¿Qué diferencia hay entre \"con datos\" y \"sin datos\"?", a: "Con datos: conocés tomo, folio, año y delegación del acta, o tenés foto de un acta anterior. Es el caso más rápido. Sin datos: solo conocés el nombre, una fecha aproximada y una localidad. En este caso hacemos búsqueda presencial en los libros hasta localizar el acta. Es un servicio específico (Búsqueda de Actas) con tarifa distinta al acta directa." },
          { q: "¿Qué plazos manejan?", a: "Con datos: Simple 3 a 5 días hábiles, Exprés 24 horas. Sin datos (búsqueda): 3 a 5 días hábiles desde que arrancamos la búsqueda presencial. Los plazos pueden extenderse si el acta está en un libro con problemas (daños, archivado irregular, dudas de identificación) lo que avisamos al momento." },
          { q: "¿El acta que entregan es original u oficial?", a: "Es un acta original digitalizada: el Registro emite el acta oficial con firma y sello, y nosotros te la entregamos en PDF. Tiene la misma validez legal que si la retirás presencialmente. Si necesitás una copia física, también la coordinamos por mensajería." },
          { q: "¿Sirve para apostillar?", a: "Sí. El acta oficial del Registro es apta para apostillarse o legalizarse para uso en el exterior. De hecho, si necesitás apostillar un acta, podemos hacer los dos trámites encadenados (primero obtener el acta, después apostillarla) como un paquete." },
          { q: "¿Sirven para trámites consulares?", a: "Sí. Las actas oficiales del Registro de las Personas de PBA son aptas para presentar en consulados extranjeros, en trámites de ciudadanía italiana, española, portuguesa, francesa, etc. Si el consulado requiere apostilla, lo coordinamos." },
          { q: "¿Qué datos ayudan en una búsqueda sin datos precisos?", a: "Nombre y apellido completos, rango aproximado de años (mientras más acotado, mejor), localidad o partido donde ocurrió el hecho. Datos adicionales que ayudan mucho: DNI de la persona, nombres de padres (para actas de nacimiento), nombre del cónyuge (para matrimonio), profesión, cualquier referencia documental que tengas. Cuanto más información, más rápida y certera la búsqueda." },
          { q: "¿Hacen búsquedas en partidos del interior de PBA?", a: "Sí. La Casa Central del Registro en La Plata centraliza libros de los 135 partidos de la Provincia. Por eso podemos buscar actas que originalmente se inscribieron en Mar del Plata, Bahía Blanca, Junín, Pergamino o cualquier otro partido, sin necesidad de que te traslades." },
          { q: "¿El trámite es 100% digital?", a: "Sí. Coordinamos por WhatsApp, nos mandás los datos del acta o de la persona a buscar, coordinamos el pago, hacemos la gestión presencial en La Plata y te enviamos el acta digitalizada en PDF oficial. Si necesitás copia física o apostilla, también lo coordinamos." },
        ],
      }] },
      { id: "divorcio", title: "Inscripción de Divorcio (Ley 22.172)", desc: "Sentencias de otras provincias", landings: [{ id: "divorcio-l", title: "Inscripción de Divorcio",
        seoTitle: "Inscripción de Divorcio Ley 22.172 en PBA | Gestor La Plata",
        pregunta: "¿Te divorciaste en otra provincia pero te casaste acá?",
        tagline: "Inscripción de Divorcio – Ley 22.172",
        intro: "Si te divorciaste en CABA o cualquier otra provincia pero te casaste en territorio bonaerense, inscribimos tu sentencia ante el Registro de las Personas de La Plata para que sea legalmente válida.",
        wa: "Hola, necesito inscribir divorcio por Ley 22.172.", waDatos: "Hola, envío documentación para inscripción de divorcio.", waAsesor: "Hola, consulta sobre inscripción de divorcio.",
        datos: ["Testimonio de Sentencia con sello legalizado", "Nota de Abogado matriculado en PBA (Art. 8)", "JUS Previsional (Ley 10.268)", "Si no tenés abogado en PBA, nosotros proveemos firma y JUS"],
        plazos: [{ tipo: "Express", tiempo: "7 días hábiles", icon: Zap }, { tipo: "Urgente", tiempo: "15 días hábiles", icon: Timer }, { tipo: "Simple", tiempo: "30 días hábiles", icon: Clock }],
        entrega: ["Inscripción registrada", "Partida de Matrimonio con Nota Marginal de Divorcio"],
        riesgos: [], review: null,
        faq: [
          { q: "¿Qué es la inscripción de divorcio por Ley 22.172?", a: "Es el trámite mediante el cual una sentencia de divorcio dictada en una jurisdicción distinta (CABA u otra provincia) se inscribe en el Registro de las Personas de la Provincia de Buenos Aires, para que tenga efectos legales sobre el acta de matrimonio originalmente inscripta en PBA. La Ley 22.172 es la normativa nacional que regula la comunicación de actos jurisdiccionales entre jurisdicciones." },
          { q: "¿Cuándo necesito hacer este trámite?", a: "Si te casaste en territorio bonaerense (tu acta de matrimonio está inscripta en PBA) pero te divorciaste en otra provincia o en CABA. Sin la inscripción del divorcio sobre el acta original, en los registros de PBA seguís figurando casado, lo que afecta trámites como nuevo matrimonio, escrituraciones, ciudadanías y cualquier gestión donde se consulte tu estado civil en PBA." },
          { q: "¿Qué pasa si no inscribo el divorcio en PBA?", a: "Para los registros provinciales seguís figurando casado con la persona anterior. Eso impide volver a casarte en PBA (porque figurás casado), puede generar problemas en escrituras donde se requiere acreditar estado civil, y en trámites de ciudadanía (italiana, española) donde se verifica el acta de matrimonio, puede frenar el expediente." },
          { q: "¿Qué documentación necesito?", a: "Testimonio de sentencia de divorcio con sello de legalización (lo emite el juzgado que dictó el divorcio), nota de abogado matriculado en PBA en los términos del Art. 8 de la Ley 22.172, y JUS previsional (Ley 10.268). Si no tenés abogado matriculado en PBA, nosotros coordinamos la firma y el JUS, así no tenés que contratar un profesional adicional." },
          { q: "¿Cuánto tarda?", a: "Depende de la modalidad elegida. Express: 7 días hábiles. Urgente: 15 días. Simple: 30 días. El contenido del trámite es el mismo, solo cambia la prioridad. Si tenés una nueva boda programada, un trámite de ciudadanía en curso o una escritura con fecha, conviene ir por el Express. Si no hay urgencia, el Simple alcanza." },
          { q: "¿Qué recibo al finalizar?", a: "La inscripción del divorcio queda registrada sobre tu acta de matrimonio de PBA, y te entregamos la partida de matrimonio con la nota marginal de divorcio. A partir de ese momento, cualquier consulta sobre tu estado civil en PBA va a reflejar correctamente que estás divorciado." },
          { q: "¿Sirve para volver a casarme?", a: "Sí. Una vez inscripto el divorcio, podés volver a casarte en PBA o en cualquier otra jurisdicción sin impedimentos. Si ya tenés fecha de matrimonio programada, coordinamos el trámite con el plazo adecuado para que llegue inscripto antes de la fecha." },
          { q: "¿Sirve para ciudadanía italiana/española/europea?", a: "Sí. Los consulados verifican tu estado civil a través del acta de matrimonio. Si te divorciaste en otra provincia y no inscribiste en PBA, el consulado va a encontrar el acta sin la nota marginal y puede frenar el expediente. Inscribir el divorcio antes de presentar el trámite de ciudadanía evita ese bloqueo." },
          { q: "¿Puedo hacer el trámite si estoy en el exterior?", a: "Sí. La coordinación es 100% digital por WhatsApp. Nos mandás la sentencia escaneada, coordinamos el pago, tramitamos la firma del abogado matriculado (si no tenés), presentamos en el Registro y te enviamos la partida con nota marginal en PDF. Muchos clientes hacen este trámite desde España, Italia o EE.UU. durante su proceso de ciudadanía." },
          { q: "¿El trámite es 100% digital?", a: "Sí, salvo el testimonio original de sentencia que tiene que llegar físicamente al Registro al momento de inscribir. Podés enviarlo por mensajería o coordinarlo con nosotros. El resto del trámite (abogado, JUS, presentación, seguimiento, recepción del acta con nota marginal) es digital." },
        ],
        }] },
      { id: "apostilla", title: "Apostilla de la Haya", desc: "Validación para el exterior", landings: [{ id: "apostilla-l", title: "Apostilla de la Haya",
        seoTitle: "Apostilla de la Haya y Legalizaciones | Gestor La Plata",
        pregunta: "¿Tus documentos necesitan validez internacional?",
        tagline: "Legalizaciones y Apostilla de la Haya",
        intro: "Hacé que tus documentos sean válidos en todo el mundo. Gestionamos la Apostilla de la Haya y legalizaciones para actas, títulos educativos y documentos notariales. Indispensable para ciudadanías, estudios o trabajo en el exterior.",
        wa: "Hola, necesito apostillar un documento.", waDatos: "Hola, envío documento para apostillar.", waAsesor: "Hola, duda sobre si mi documento está listo para apostillar.",
        datos: ["Actas de Registro Civil (nacimiento, matrimonio, defunción)", "Títulos y certificaciones educativas", "Sentencias y actas judiciales", "Documentos notariales (poderes, escrituras)"],
        plazos: [{ tipo: "Express", tiempo: "24 hs", icon: Zap }, { tipo: "Estándar", tiempo: "10 a 15 días hábiles", icon: Clock }],
        entrega: ["Documentación oficial"],
        riesgos: [], review: null,
        faq: [
          { q: "¿Qué es la Apostilla de la Haya?", a: "Es una certificación que valida la firma y sello del funcionario que emitió un documento público, para que ese documento tenga validez legal en cualquier país firmante del Convenio de la Haya de 1961. Argentina es firmante, por lo que cualquier documento argentino apostillado es reconocido directamente en más de 120 países sin necesidad de legalizaciones adicionales en consulados." },
          { q: "¿Para qué se usa habitualmente?", a: "Ciudadanías europeas (italiana, española, portuguesa, francesa), estudios en el exterior (títulos educativos apostillados), trabajo afuera (diplomas y certificados laborales), trámites migratorios, validación de poderes y escrituras notariales para operar en otros países, presentación de sentencias judiciales argentinas en el exterior." },
          { q: "¿Qué documentos se pueden apostillar?", a: "Actas del Registro Civil (nacimiento, matrimonio, defunción), títulos y certificaciones educativas (primarios, secundarios, universitarios, analíticos), sentencias y actas judiciales, documentos notariales (poderes, escrituras, certificaciones de firma). En general cualquier documento público argentino con firma de funcionario registrado." },
          { q: "¿Cuál es la diferencia entre apostilla y legalización?", a: "La apostilla es el sistema simplificado del Convenio de la Haya y sirve para los más de 120 países firmantes. La legalización tradicional (más compleja) se usa para países no firmantes: requiere certificaciones en cancillería argentina y luego en el consulado del país de destino. Para países Haya, la apostilla reemplaza todo ese proceso con un solo sello." },
          { q: "¿Cuánto tarda?", a: "Express: 24 horas. Estándar: 10 a 15 días hábiles. Si tenés pasaje sacado o turno en consulado, pasanos las fechas y te armamos el cronograma para que llegue a tiempo. Para trámites con plazos ajustados trabajamos habitualmente con el Express." },
          { q: "¿Qué pasa si el país de destino no está en el Convenio de la Haya?", a: "Hay que ir por legalización consular tradicional, que es un circuito distinto y más largo. Países como EAU, Vietnam o algunos países africanos no son firmantes Haya. En esos casos, el documento se legaliza primero en Cancillería argentina y después en el consulado del país de destino. Consultanos el país específico y te indicamos el circuito correcto." },
          { q: "¿Sirve la apostilla para siempre?", a: "Sí, la apostilla no caduca. Una vez apostillado el documento, la validez es permanente para uso en el extranjero. Lo que puede caducar es el documento subyacente (por ejemplo, un poder con vigencia limitada por el acto que autoriza)." },
          { q: "¿Puedo coordinar el trámite desde el exterior?", a: "Sí. Si ya vivís afuera y necesitás apostillar un documento argentino (típico caso de ciudadanías que piden actas del país de origen), coordinamos todo por WhatsApp. Nos enviás los documentos por mensajería o coordinamos que los retire un familiar, hacemos la apostilla y te los enviamos apostillados por courier internacional al país donde estés." },
        ],
        }] },
    ]
  },
  { id: "habilitaciones", icon: Store, title: "Habilitaciones Comerciales", scope: "LP", desc: "Altas, bajas, transferencias, cambios de rubro y regularización", color: "#F4A261",
    subs: [
      { id: "alta", title: "Alta de Habilitación y Factibilidad", desc: "Gestión completa para nuevos comercios", landings: [{ id: "alta-l", title: "Alta de Habilitación",
        seoTitle: "Habilitación Comercial en La Plata | Gestor La Plata",
        pregunta: "¿Vas a abrir un local? No firmes sin consultarnos.",
        tagline: "Alta de Habilitación y Factibilidad",
        intro: "Asegurá tu inversión desde el primer día. Gestionamos la habilitación comercial integral en La Plata: análisis de zonificación, factibilidad en 24 hs, armado de legajo y seguimiento hasta el cartón final.",
        wa: "Hola, presupuesto para Habilitación Comercial.", waDatos: "Hola, envío datos del local para habilitación.", waAsesor: "Hola, consulta técnica sobre habilitación de local.",
        datosGroups: [{ label: "Datos del Inmueble", icon: "🏢", items: ["Dirección exacta (Calle y número)", "Partida Inmobiliaria"] }, { label: "Datos de la Actividad", icon: "💼", items: ["Rubro principal y anexos", "Superficie aproximada del local"] }, { label: "Documentación base", icon: "📄", items: ["¿Tiene planos de obra aprobados?", "¿Contrato de alquiler o propietario?"] }],
        plazos: [{ tipo: "Factibilidad", tiempo: "24 horas", icon: Zap }, { tipo: "Gestión de Alta", tiempo: "Según inspección municipal", icon: Clock }],
        entrega: ["Cartón de Habilitación oficial", "Informe CERPROSA", "Libro de actas", "Asesoramiento post-habilitación"],
        riesgos: [{ text: "Clausura inmediata del local.", icon: Ban }, { text: "Multas que superan el costo del trámite.", icon: CircleDollarSign }, { text: "Sin cobertura de seguro ante siniestros.", icon: ShieldAlert }, { text: "Responsabilidad civil con patrimonio personal.", icon: Gavel }],
        review: { text: "Superó ampliamente nuestras expectativas. Confiable, eficiente, empático y profesional.", author: "Keila Moreno", rubro: "Particular" },
        faq: [
          { q: "¿Qué es una habilitación comercial y por qué es obligatoria?", a: "La habilitación comercial es el permiso que otorga el municipio para que un local pueda funcionar legalmente. En el Partido de La Plata la emite la Dirección de Habilitaciones de la Municipalidad y se materializa en el cartón de habilitación que debe exhibirse en el local. Es obligatoria para todo comercio, oficina, consultorio, depósito o actividad económica que funcione en un inmueble. Abrir sin habilitación expone al titular a clausura inmediata, multas que suelen superar el costo del trámite, y responsabilidad civil ilimitada ante siniestros (incendio, accidentes de clientes o empleados) porque el seguro no cubre si el local no tiene habilitación vigente." },
          { q: "¿Cuánto tarda una habilitación comercial en La Plata?", a: "El plazo depende del rubro, la superficie y el estado del inmueble. Una factibilidad inicial (consulta de zonificación para saber si tu actividad está permitida en esa dirección) la resolvemos en 24 horas. La gestión completa del alta, desde la presentación del legajo hasta la entrega del cartón, varía según la categoría del comercio y la agilidad de las inspecciones municipales. Los rubros de bajo riesgo (kioscos, oficinas, comercios minoristas chicos) son más rápidos. Los rubros con riesgo sanitario, ambiental o de incendio (gastronomía, depósitos, industrias) demandan más pasos y por eso llevan más tiempo. Pasanos los datos del local por WhatsApp y te damos un plazo estimado para tu caso puntual." },
          { q: "¿Qué pasa si abro el local sin la habilitación?", a: "El riesgo es alto y concreto. Control Urbano realiza inspecciones periódicas y ante la detección de un comercio sin habilitación puede labrar acta de infracción, aplicar multa y ordenar clausura preventiva hasta regularizar. Más grave aún: en caso de siniestro (incendio, accidente de un cliente, daño a terceros) el seguro comercial no responde porque el local opera en infracción, y la responsabilidad recae en el patrimonio personal del titular. Además, sin habilitación no podés facturar formalmente ni inscribirte en la mayoría de plataformas de pago, delivery o proveedores mayoristas que exigen el cartón." },
          { q: "¿Puedo habilitar cualquier local en cualquier zona de La Plata?", a: "No. El Código de Ordenamiento Urbano de La Plata divide el partido en zonas y cada zona tiene un listado de rubros permitidos, condicionales y prohibidos. Por ejemplo, no podés instalar un depósito industrial en una zona residencial, ni un boliche bailable en una calle comercial sin cumplir requisitos específicos de insonorización y salidas de emergencia. Antes de firmar contrato de alquiler o comprar un inmueble para un comercio, conviene pedir una factibilidad de zonificación. En 24 horas te decimos si el rubro que querés instalar está permitido en esa dirección específica." },
          { q: "¿Qué documentación necesito para iniciar el trámite?", a: "Lo básico: dirección exacta del local, partida inmobiliaria, rubro o rubros a habilitar, superficie aproximada, contrato de alquiler (o escritura si sos propietario), y planos de obra aprobados si los hay. Según el rubro pueden pedirse documentos adicionales: libre deuda de ARBA, libre deuda municipal, planos de electricidad firmados por matriculado, certificado de desinfección, habilitación sanitaria de bromatología, informe de Defensa Civil, entre otros. Nosotros armamos el legajo completo, coordinamos con los profesionales matriculados que se necesiten e iniciamos la gestión ante la Municipalidad." },
          { q: "¿Qué es la factibilidad y para qué sirve?", a: "La factibilidad es un informe previo que verifica si el rubro que querés instalar está permitido en esa dirección específica según el Código de Ordenamiento Urbano. Es el paso que te evita firmar contrato de alquiler por un local donde después no vas a poder habilitar tu actividad. Tarda 24 horas y es la consulta más importante que podés hacer antes de tomar un local. Incluye la verificación de zonificación, restricciones de superficie mínima/máxima, requisitos de estacionamiento si aplica, y condicionamientos específicos del rubro. Recomendamos siempre pedirla antes de señar o firmar contrato." },
          { q: "¿La habilitación es a nombre del local o del titular?", a: "Es a nombre del titular de la actividad (persona física o jurídica) para ese local específico. Si cambia el titular (venta del fondo de comercio, cambio de sociedad) hay que hacer una transferencia de habilitación. Si cambia el rubro o se anexa uno nuevo, se tramita una modificación. Si el titular se muda a otro local, la habilitación no viaja con él: hay que iniciar una nueva en la dirección nueva. Este es un punto importante al comprar un fondo de comercio: verificá que la habilitación esté vigente y a nombre del vendedor antes de señar." },
          { q: "¿Qué es el cartón de habilitación y por qué es importante?", a: "El cartón de habilitación es el documento oficial que emite la Municipalidad y acredita que el local está habilitado para funcionar. Se entrega al finalizar el trámite y debe exhibirse en un lugar visible del local. Contiene el número de expediente, razón social del titular, dirección del local, rubros autorizados y superficie habilitada. En una inspección municipal es lo primero que piden. También lo piden compañías de seguros para emitir póliza comercial, bancos para abrir cuenta comercial, y la mayoría de las plataformas de delivery (PedidosYa, Rappi) para dar de alta un comercio." },
          { q: "¿Habilitan en Berisso y Ensenada también?", a: "No. Nos especializamos exclusivamente en el Partido de La Plata (Casco urbano, City Bell, Gonnet, Tolosa, Los Hornos, Villa Elisa, Melchor Romero, Etcheverry, San Carlos, Arturo Seguí, José Hernández, Savoia, Lisandro Olmos, Abasto, Parque Sicardi y las demás localidades que integran el partido). Berisso y Ensenada son partidos separados con su propia normativa municipal y nosotros no gestionamos en esas jurisdicciones. Si tu local está en Berisso o Ensenada, te recomendamos contactar una gestoría local especializada en esos partidos." },
          { q: "¿El trámite es 100% digital?", a: "Sí. No necesitás ir a ninguna oficina. Coordinamos toda la documentación por WhatsApp, armamos el legajo digitalmente, presentamos online donde el municipio lo permite y coordinamos las visitas al local cuando la Municipalidad las exige (inspecciones obligatorias según rubro). Recibís todas las actualizaciones del expediente por WhatsApp y el cartón de habilitación te lo entregamos al finalizar el trámite. Trabajamos con comercios de toda La Plata y tenemos +312 reseñas 5.0 en Google avalando el servicio." },
        ],
      }] },
      { id: "transferencia", title: "Transferencias y Modificaciones", desc: "Traspaso de titularidad o cambios", landings: [{ id: "transferencia-l", title: "Transferencias",
        seoTitle: "Transferencia de Habilitación Comercial La Plata | Gestor La Plata",
        pregunta: "¿Cambiás de dueño, rubro o superficie?",
        tagline: "Transferencias y Modificaciones – La Plata",
        intro: "Actualizá la situación legal de tu comercio en La Plata. Gestionamos transferencias por venta de fondo de comercio, anexos de rubros, cambios de superficie y denominación social.",
        wa: "Hola, presupuesto para Transferencia de habilitación.", waDatos: "Hola, envío datos para transferencia.", waAsesor: "Hola, consulta sobre transferencia de comercio.",
        datosGroups: [{ label: "Tipo de Modificación", icon: "🔄", items: ["Transferencia de Titularidad", "Anexo o Cambio de Rubro", "Ampliación o Reducción de Superficie", "Cambio de Denominación Social"] }, { label: "Documentación", icon: "📄", items: ["Cartón de habilitación actual", "Contrato de transferencia o nuevo contrato"] }],
        plazos: [{ tipo: "Análisis", tiempo: "24 a 72 hs hábiles", icon: Timer }, { tipo: "Gestión", tiempo: "Según complejidad", icon: Clock }],
        entrega: ["Certificado actualizado", "Baja del titular anterior", "Actualización en APR", "Asesoramiento legal"],
        riesgos: [{ text: "Multas por rubro no declarado.", icon: Receipt }, { text: "Responsabilidad legal del antiguo dueño.", icon: Gavel }, { text: "Invalidez del seguro comercial.", icon: ShieldAlert }, { text: "Acta de infracción por discrepancia.", icon: FileWarning }],
        review: { text: "Excelente la atención y la rapidez. Lo recomiendo 100%.", author: "Silvana Roman", rubro: "Particular" },
        faq: [
          { q: "¿Qué es una transferencia de habilitación?", a: "Es el trámite por el cual se cambia la titularidad del cartón de habilitación comercial: el comercio sigue funcionando en el mismo local con el mismo rubro, pero pasa a estar a nombre de un nuevo titular (persona física o jurídica). Se usa habitualmente en ventas de fondo de comercio, cambios societarios o transferencias entre familiares." },
          { q: "¿Cuándo se transfiere y cuándo conviene dar de baja y abrir nuevo?", a: "Si el local sigue funcionando con el mismo rubro y solo cambia el dueño, conviene la transferencia: es más rápida, aprovecha el cartón existente y mantiene el historial. Si cambia el rubro principal, si el local sufrió modificaciones significativas (ampliaciones, cambio de estructura), o si la habilitación original tiene defectos graves, a veces es mejor dar de baja e iniciar un alta nueva." },
          { q: "¿Qué pasa si compro un fondo de comercio sin transferir la habilitación?", a: "La habilitación sigue a nombre del vendedor. Eso te deja expuesto a varios problemas: el vendedor figura como responsable ante cualquier inspección o reclamo, el seguro del local puede rechazar siniestros por falta de titularidad, no podés facturar ni inscribirte en plataformas con esos datos, y las deudas municipales del local se mezclan con las del vendedor. Transferir en tiempo es parte del cierre correcto de una compra de fondo de comercio." },
          { q: "¿Qué tipos de modificación gestionan además de titularidad?", a: "Anexo o cambio de rubro (agregar una actividad al comercio o cambiarla), ampliación o reducción de superficie habilitada, cambio de denominación social (típico cuando una SRL cambia de nombre o hay cambio societario sin venta total del fondo). Cualquier modificación sobre el cartón vigente pasa por este circuito." },
          { q: "¿Cuánto tarda?", a: "El análisis inicial lo hacemos en 24 a 72 horas hábiles: revisamos la documentación existente, identificamos qué modificaciones son viables y cuáles requieren trámites adicionales. La gestión efectiva varía según la complejidad y la agilidad de la Municipalidad de La Plata. Te damos un plazo estimado tras el análisis inicial." },
          { q: "¿Qué documentación necesito?", a: "Cartón de habilitación actual (foto o copia), contrato de transferencia de fondo de comercio o documentación que acredite el cambio que estás haciendo (nuevo contrato de alquiler si cambió, acta societaria si cambió la razón social). Datos del nuevo titular: CUIT, datos personales o societarios. Coordinamos los detalles por WhatsApp." },
          { q: "¿Qué riesgos corro si no transfiero?", a: "Multas por rubro no declarado si cambiaste la actividad sin informar. Responsabilidad legal del dueño anterior (que te puede venir a reclamar si pasa algo). Invalidez del seguro comercial porque no coincide titular con operador. Actas de infracción por discrepancia entre lo declarado y lo real. Ante una inspección, todas estas discrepancias salen a la luz." },
          { q: "¿Qué entregables recibo al finalizar?", a: "Certificado de habilitación actualizado a nombre del nuevo titular, baja registrada del titular anterior, actualización en la APR (Agencia Platense de Recaudación) con la nueva titularidad, asesoramiento legal sobre los pasos post-transferencia (seguros, libros contables, notificación a proveedores y plataformas)." },
          { q: "¿Se puede transferir si el local tiene deudas municipales?", a: "Sí, pero las deudas vigentes se van a identificar en el trámite y deben regularizarse. Según el acuerdo que tengas con el vendedor, las deudas pre-transferencia las paga él; las posteriores, el nuevo titular. Conviene tener esto claro antes de firmar el contrato de transferencia de fondo de comercio para no tener sorpresas." },
          { q: "¿El trámite es 100% digital?", a: "La documentación y coordinación se maneja por WhatsApp. Las presentaciones ante la Municipalidad las hacemos nosotros. Si la Municipalidad requiere inspección previa al nuevo titular, coordinamos la visita. Cubrimos habilitaciones solo en Partido de La Plata (no Berisso ni Ensenada)." },
        ],
      }] },
      { id: "baja", title: "Bajas y Regularización", desc: "Cese formal o normalización", landings: [{ id: "baja-l", title: "Bajas y Regularización",
        seoTitle: "Baja de Habilitación Comercial La Plata | Gestor La Plata",
        pregunta: "¿Cerraste pero nunca diste de baja?",
        tagline: "Bajas y Regularización – La Plata",
        intro: "Cerrar las persianas no significa cerrar el comercio ante la ley. Gestionamos el cese formal de tu actividad ante la Municipalidad de La Plata, o normalizamos trámites que quedaron frenados. Evitá deudas y sanciones futuras.",
        wa: "Hola, presupuesto para Baja o Regularización.", waDatos: "Hola, envío datos para baja comercial.", waAsesor: "Hola, cerré mi local y nunca hice la baja.",
        datosGroups: [{ label: "Situación del Trámite", icon: "📋", items: ["Baja definitiva por cese de actividad", "Regularización de habilitación incompleta"] }, { label: "Datos del Comercio", icon: "🏢", items: ["Número de Legajo o Expediente", "CUIT del titular", "Dirección donde funcionaba"] }, { label: "Documentación", icon: "📄", items: ["¿Tiene certificado de habilitación a dar de baja?", "¿Posee notificaciones de la Municipalidad/APR?"] }],
        plazos: [{ tipo: "Análisis", tiempo: "24 a 96 hs hábiles", icon: Timer }, { tipo: "Gestión", tiempo: "Según mesa de entradas", icon: Clock }],
        entrega: ["Certificado de Baja Comercial", "Resolución de Regularización", "Libre Deuda de Tasas Municipales", "Cierre de expediente administrativo"],
        riesgos: [{ text: "Acumulación de Tasas de Seguridad e Higiene.", icon: Receipt }, { text: "Responsabilidad civil continua.", icon: Gavel }, { text: "Inhibiciones y juicios de apremio.", icon: Ban }, { text: "Multas retroactivas por trámite inconcluso.", icon: CircleDollarSign }],
        review: null,
        faq: [
          { q: "¿Qué pasa si cierro el local pero no doy de baja la habilitación?", a: "La habilitación sigue vigente en los registros municipales. Eso genera: acumulación de Tasa de Seguridad e Higiene que sigue corriendo mes a mes, posibles inspecciones al local cerrado, responsabilidad civil continua como si el comercio siguiera operando, y eventualmente juicios de apremio por las tasas impagas. Cerrar las persianas no cierra el trámite: hay que dar de baja formalmente." },
          { q: "¿Cuánto tiempo puedo dejar pasar antes de dar de baja?", a: "Cuanto antes mejor. Cada mes que pasa suma Tasa de Seguridad e Higiene. Si dejás pasar años, podés llegar a tener deudas retroactivas importantes, con intereses punitorios y gastos administrativos. La baja tardía es más cara que la baja oportuna. Si ya cerraste hace tiempo, el primer paso es hacer el diagnóstico para saber qué hay acumulado." },
          { q: "¿Qué es la regularización cuando la habilitación está incompleta?", a: "Es el caso donde la habilitación se inició pero nunca se terminó: expediente en trámite, documentación faltante, inspecciones no realizadas, o cartón nunca retirado. El comercio operó pero formalmente la habilitación nunca quedó cerrada. La regularización consiste en normalizar esa situación: presentar lo faltante, pagar lo pendiente, y llegar a una situación legal clara (habilitado o dado de baja)." },
          { q: "¿Qué entregables recibo al cerrar la baja?", a: "Certificado de Baja Comercial emitido por la Municipalidad, Resolución de Regularización si hubo trámites pendientes, Libre Deuda de Tasas Municipales al momento del cierre, cierre del expediente administrativo. Con estos documentos te queda cerrada la historia comercial del local a tu nombre." },
          { q: "¿Qué pasa con las deudas acumuladas durante el tiempo sin baja?", a: "Se identifican en el trámite y hay que regularizarlas. Según la situación, podés acogerte a planes de pago municipales o moratorias vigentes. La APR (Agencia Platense de Recaudación) es la que gestiona estas cobranzas. Hasta que no se regulariza la deuda, el trámite de baja no avanza. Por eso conviene no postergar." },
          { q: "¿Cuánto tarda el trámite?", a: "El análisis inicial: 24 a 96 horas hábiles. Ahí identificamos en qué estado está la habilitación, qué deudas hay, y qué documentación se necesita. La gestión efectiva de la baja depende de la Municipalidad y del volumen de documentación a presentar: casos simples, semanas; casos complejos con deudas significativas o regularización de expedientes viejos, pueden tomar meses." },
          { q: "¿Qué documentación necesito?", a: "Número de legajo o expediente de habilitación si lo tenés, CUIT del titular, dirección donde funcionaba el local, certificado de habilitación (si lo tenés a mano), cualquier notificación municipal o de la APR que hayas recibido. Si no tenés nada de documentación, igual podemos arrancar con los datos del titular y la dirección: la información se reconstruye en el análisis inicial." },
          { q: "¿Qué pasa si el local pasó a otro dueño sin transferencia formal?", a: "Este es un caso frecuente. Si vendiste el fondo de comercio sin transferir la habilitación, la responsabilidad sigue a tu nombre hasta que formalices la baja. Si el comprador sigue operando el local con tu habilitación, no solo vos tenés riesgo: el comprador también, porque el seguro y la responsabilidad no coinciden con el operador real. Se resuelve con una transferencia o baja + nueva habilitación, según lo que acuerden las partes." },
          { q: "¿Qué riesgos corro si dejo todo como está y no regularizo?", a: "Acumulación sostenida de Tasa de Seguridad e Higiene, inhibiciones por juicios de apremio de la APR, afectación del patrimonio personal si las deudas escalan, multas retroactivas por trámites inconclusos, complicaciones si querés abrir un nuevo comercio (porque tu CUIT figura con antecedentes no regularizados)." },
          { q: "¿El trámite es 100% digital?", a: "La coordinación y documentación se maneja por WhatsApp. Las presentaciones ante la Municipalidad y la APR las hacemos nosotros. Cubrimos solo Partido de La Plata (no Berisso ni Ensenada). Si te mudaste de La Plata y tenés un expediente abierto acá, podemos cerrarlo sin que vuelvas." },
        ],
      }] },
    ]
  },
  { id: "permisos", icon: Megaphone, title: "Permisos y Publicidad", scope: "LP", desc: "Licencias ReBA, publicidad en vía pública y permisos para eventos", color: "#F4A261",
    subs: [
      { id: "eventos", title: "Eventos y Espectáculos", desc: "Permisos municipales temporales", landings: [{ id: "eventos-l", title: "Permisos de Eventos",
        seoTitle: "Permiso para Eventos en La Plata | Gestor La Plata",
        pregunta: "¿Organizás un evento y necesitás el permiso?",
        tagline: "Eventos, Recitales y Espectáculos – La Plata",
        intro: "Obtenemos los permisos obligatorios para fiestas, espectáculos musicales, eventos deportivos o culturales en La Plata. Gestión anticipada con mínimo 20 días de antelación según normativa municipal.",
        wa: "Hola, presupuesto para permiso de evento.", waDatos: "Hola, envío datos del evento para permiso.", waAsesor: "Hola, consulta sobre requisitos para evento.",
        datosGroups: [{ label: "Datos del Evento", icon: "🗓️", items: ["Tipo (Recital, Fiesta, Deportivo, Cultural)", "Fecha y horario previsto", "Cantidad estimada de asistentes"] }, { label: "Datos de Ubicación", icon: "📍", items: ["Dirección exacta del predio/local", "¿Espacio abierto o cerrado?", "¿Habilitación previa para otro rubro?"] }, { label: "Servicios obligatorios", icon: "🚑", items: ["¿Servicio de emergencias médicas?", "¿Seguro de responsabilidad civil?", "¿Seguridad privada contratada?"] }],
        plazos: [{ tipo: "Obligatorio", tiempo: "Mínimo 20 días antes", icon: CalendarX }],
        entrega: ["Resolución Municipal de Autorización", "Cómputo de canon municipal", "Acta de inspección previa", "Gestión de ReBA Eventual (opcional)"],
        riesgos: [{ text: "Clausura y desalojo inmediato.", icon: Ban }, { text: "Multas que triplican el costo del evento.", icon: CircleDollarSign }, { text: "Responsabilidad penal ante incidentes.", icon: Gavel }, { text: "Incautación de equipos de sonido e iluminación.", icon: Package }],
        review: null,
        faq: [
          { q: "¿Qué eventos requieren permiso municipal en La Plata?", a: "Fiestas privadas abiertas al público, recitales y espectáculos musicales, eventos deportivos organizados, eventos culturales (ferias, festivales, exposiciones), eventos gastronómicos de cierta escala, eventos corporativos masivos. La Municipalidad de La Plata exige permiso cuando hay convocatoria abierta o cantidad significativa de asistentes, independientemente de si es pago o gratuito." },
          { q: "¿Con cuánta anticipación tengo que gestionar el permiso?", a: "Mínimo 20 días antes del evento, según la normativa municipal. Es un plazo que no admite urgencias: si llegás con menos tiempo, el trámite no entra en el circuito formal y corrés riesgo de no tener la autorización el día del evento. Si tenés una fecha cerrada, calculamos hacia atrás y coordinamos para presentar con el margen necesario." },
          { q: "¿Qué pasa si hago el evento sin permiso?", a: "Los riesgos son concretos y graves. Control Urbano puede clausurar el evento en el momento y ordenar desalojo. Las multas suelen triplicar el costo que habría tenido el trámite formal. Si hay un incidente (pelea, accidente, siniestro), la responsabilidad penal recae sobre el organizador sin los respaldos que el permiso habilita. Los equipos de sonido e iluminación pueden ser incautados. Y todo esto queda en antecedentes municipales que complican eventos futuros." },
          { q: "¿Qué servicios obligatorios tengo que contratar?", a: "Según la naturaleza y tamaño del evento: servicio de emergencias médicas (ambulancia con personal), seguro de responsabilidad civil con cobertura por el evento, seguridad privada habilitada. La Municipalidad va a verificar estos servicios como condición para emitir el permiso. Tenemos contactos con prestadores habilitados si necesitás orientación." },
          { q: "¿Qué datos del evento necesito aportar?", a: "Tipo de evento (recital, fiesta, deportivo, cultural), fecha y horario, cantidad estimada de asistentes, dirección exacta del predio o local, si es espacio abierto o cerrado, si ya hay habilitación previa del lugar para otro rubro. Con esos datos arrancamos el análisis de factibilidad." },
          { q: "¿Qué entregables recibo al finalizar?", a: "Resolución Municipal de autorización del evento, cómputo oficial del canon municipal a pagar, acta de inspección previa si aplica, gestión de ReBA Eventual si en el evento se va a vender alcohol (trámite complementario obligatorio). Con la resolución en mano, el evento tiene respaldo formal ante cualquier inspección o incidencia." },
          { q: "¿Sirve el permiso para cualquier espacio?", a: "El espacio tiene que ser apto para la actividad. Un local habilitado para otro rubro (oficina, salón de usos múltiples) puede servir para eventos chicos, pero grandes convocatorias requieren lugares específicamente preparados. En el análisis inicial verificamos si el predio propuesto es viable para el tipo y tamaño de evento planificado." },
          { q: "¿Qué es el ReBA Eventual?", a: "Si en el evento se va a vender o suministrar bebidas alcohólicas, además del permiso de evento necesitás una licencia ReBA Eventual específica para esa fecha y ese lugar. Es un trámite complementario que coordinamos en paralelo. Eventos sin alcohol no requieren ReBA." },
          { q: "¿Cubren eventos en Berisso o Ensenada?", a: "No. Trabajamos solo en el Partido de La Plata. Berisso y Ensenada tienen normativa propia y nosotros no gestionamos en esas jurisdicciones. Si tu evento es en alguno de esos partidos, te recomendamos contactar una gestoría local especializada." },
          { q: "¿El trámite es 100% digital?", a: "La coordinación y documentación se maneja por WhatsApp. Las presentaciones ante la Municipalidad y las inspecciones previas si aplican las hacemos nosotros. Para eventos grandes con plazos ajustados, conviene empezar a gestionar apenas tengas la fecha confirmada." },
        ],
      }] },
      { id: "publicidad", title: "Publicidad y Mesas y Sillas", desc: "Cartelería y ocupación de vereda", landings: [{ id: "publicidad-l", title: "Publicidad y Mesas",
        seoTitle: "Publicidad y Mesas y Sillas La Plata | Gestor La Plata",
        pregunta: "¿Tenés carteles o mesas en la vereda sin declarar?",
        tagline: "Publicidad, Propaganda y Mesas y Sillas – La Plata",
        intro: "Tu marca legalmente visible y tu espacio optimizado. Gestionamos la declaración de cartelería y el permiso de ocupación de vereda ante la Municipalidad y la APR de La Plata.",
        wa: "Hola, presupuesto para publicidad o mesas y sillas.", waDatos: "Hola, envío fotos y medidas del cartel/mesas.", waAsesor: "Hola, consulta sobre declaración de publicidad.",
        datosGroups: [{ label: "Elementos Publicitarios", icon: "📢", items: ["Tipo: Cartel frontal, marquesina, vinilos, letrero", "Medidas aproximadas (Ancho x Alto)", "¿Iluminado o pantallas LED?"] }, { label: "Ocupación de Vía Pública", icon: "🪑", items: ["Cantidad de mesas y sillas", "¿Maceteros, sombrillas o cerramientos?", "Metros lineales de frente del local"] }],
        plazos: [{ tipo: "Liquidación", tiempo: "5 a 10 días hábiles", icon: Clock }, { tipo: "Mesas y Sillas", tiempo: "Sujeto a inspección", icon: Timer }],
        entrega: ["Certificado de Publicidad y Propaganda", "Oblea/Permiso de Ocupación", "Liquidación anual/trimestral de derechos"],
        riesgos: [{ text: "Multas por publicidad no declarada.", icon: Receipt }, { text: "Decomiso de mobiliario en la vía pública.", icon: Package }, { text: "Responsabilidad legal por obstrucción de paso.", icon: Gavel }, { text: "Deudas retroactivas con intereses punitorios.", icon: CircleDollarSign }],
        review: null,
        faq: [
          { q: "¿Qué publicidad hay que declarar ante la Municipalidad?", a: "Carteles frontales del local, marquesinas, vinilos sobre vidrieras, letreros luminosos, pantallas LED, carteles salientes. Cualquier elemento publicitario visible desde la vía pública requiere declaración y pago del derecho correspondiente. El tributo se calcula sobre la superficie total de los elementos y si son iluminados o no." },
          { q: "¿Y las mesas y sillas en la vereda?", a: "El uso del espacio público (vereda) para ocupación con mesas, sillas, maceteros, sombrillas o cerramientos requiere permiso específico de ocupación de vía pública. Se tramita ante la Municipalidad y se renueva periódicamente. Sin el permiso, el mobiliario puede ser decomisado por Control Urbano." },
          { q: "¿Qué pasa si no declaro mi publicidad?", a: "Multas por publicidad no declarada, con el agregado de que se liquidan retroactivamente con intereses punitorios desde el momento en que se instaló el elemento. Si la Municipalidad detecta en una inspección carteles no declarados, la deuda puede acumularse por meses o años hacia atrás." },
          { q: "¿Y si tengo mesas en la vereda sin permiso?", a: "Riesgo de decomiso del mobiliario por parte de Control Urbano, responsabilidad legal por obstrucción del paso peatonal si alguien se accidenta, deudas retroactivas por ocupación no declarada. Además, eventos o inspecciones pueden terminar en clausura si la irregularidad es significativa." },
          { q: "¿Qué datos necesito para la gestión de publicidad?", a: "Tipo de elementos publicitarios (cartel frontal, marquesina, vinilos, letrero, pantalla LED), medidas aproximadas (ancho x alto), si son iluminados o tienen pantalla electrónica. Fotos del local son muy útiles para calcular bien los derechos." },
          { q: "¿Y para mesas y sillas?", a: "Cantidad de mesas y sillas a colocar, si vas a usar maceteros, sombrillas o cerramientos (paravientos, divisorios), metros lineales del frente del local sobre la vereda. La Municipalidad evalúa si el ancho de vereda permite la ocupación sin obstruir el paso peatonal." },
          { q: "¿Cuánto tarda la liquidación?", a: "La liquidación del derecho de publicidad la resolvemos en 5 a 10 días hábiles. Para mesas y sillas, el permiso está sujeto a inspección previa (Control Urbano verifica medidas y condiciones del lugar) lo cual agrega tiempo según la agenda de inspecciones." },
          { q: "¿Qué entregables recibo?", a: "Certificado de Publicidad y Propaganda, oblea o permiso de ocupación para mesas y sillas, liquidación anual o trimestral de derechos (según la categoría). Con estos documentos el local queda en regla ante cualquier inspección municipal." },
          { q: "¿Cada cuánto se renueva?", a: "Los derechos de publicidad son anuales o trimestrales según la categoría y hay que pagarlos periódicamente para mantener la declaración vigente. El permiso de ocupación de vía pública tiene su propia vigencia y se renueva en los plazos que indique la Municipalidad. Te avisamos cuando corresponde renovar si sos cliente recurrente." },
          { q: "¿Gestionan también publicidad en rutas o vía pública?", a: "Lo que gestionamos es publicidad vinculada al frente del local comercial y uso de vereda. Publicidad en rutas provinciales, vallas urbanas independientes o cartelería fuera del frente del local tiene normativas específicas (provinciales o municipales distintas) que no siempre cubrimos. Consultanos el caso puntual y te decimos si entra en nuestro alcance." },
        ],
      }] },
      { id: "reba", title: "Licencia ReBA (Alcohol)", desc: "Inscripción y renovación anual", landings: [{ id: "reba-l", title: "Licencia ReBA",
        seoTitle: "Licencia ReBA Venta de Alcohol La Plata | Gestor La Plata",
        pregunta: "¿Vendés alcohol y no tenés la licencia al día?",
        tagline: "Licencia ReBA – Venta de Bebidas Alcohólicas – La Plata",
        intro: "Comercializá legalmente bebidas alcohólicas en La Plata. Gestionamos tu inscripción y renovación anual en el Registro Provincial de Bebidas Alcohólicas (ReBA) a través de la Municipalidad.",
        wa: "Hola, presupuesto para Licencia ReBA.", waDatos: "Hola, envío datos de habilitación para ReBA.", waAsesor: "Hola, mi licencia venció. ¿Cómo la recupero?",
        datosGroups: [{ label: "Datos del Comercio", icon: "🏢", items: ["Categoría: Distribuidora, Almacén, Bar, Evento", "CUIT del titular", "Legajo de Habilitación Municipal (excluyente)"] }, { label: "Ubicación", icon: "📍", items: ["Dirección exacta del local", "Localidad (dentro del partido de La Plata)"] }],
        plazos: [{ tipo: "Emisión", tiempo: "2 a 5 días hábiles", icon: Clock }, { tipo: "Vigencia", tiempo: "1 año (renovamos hasta 7 días antes)", icon: Timer }],
        entrega: ["Credencial ReBA oficial con código QR", "Comprobante de pago de tasa provincial", "Guía sobre horarios y prohibiciones vigentes"],
        riesgos: [{ text: "Clausura inmediata del local (10 a 30 días).", icon: Ban }, { text: "Decomiso de todo el stock de bebidas.", icon: Package }, { text: "Multas millonarias del Ministerio de Seguridad.", icon: Siren }, { text: "Antecedentes que dificultan futuras renovaciones.", icon: FileWarning }],
        review: { text: "Le pedí un acta con datos mínimos y a los pocos días me la entregó firmada. Un crack!", author: "Paola Añaños", rubro: "Particular" },
        faq: [
          { q: "¿Qué es la Licencia ReBA?", a: "ReBA es el Registro Provincial de Bebidas Alcohólicas. La Licencia ReBA es el permiso obligatorio para comercializar bebidas alcohólicas en la Provincia de Buenos Aires: desde almacenes y supermercados que venden vino y cerveza, hasta bares, restaurantes, distribuidoras y boliches. Sin ReBA vigente, la venta de alcohol es ilegal." },
          { q: "¿Para quién es obligatoria?", a: "Para cualquier comercio que venda bebidas alcohólicas al público: distribuidoras, almacenes, supermercados, minimercados, kioscos que venden cerveza, vinerías, bares, pubs, restaurantes, cervecerías, boliches. También para eventos donde se sirva alcohol (ReBA Eventual). La licencia es por local y por titular: cada punto de venta requiere su licencia." },
          { q: "¿Qué categorías de licencia hay?", a: "Las principales: Distribuidora (venta mayorista), Almacén/Supermercado (venta minorista envasada), Bar/Restaurante (consumo en local), Evento (temporal para fiestas o espectáculos). Según la categoría cambian los requisitos, la tasa y algunas restricciones horarias. Te asesoramos qué categoría corresponde a tu actividad." },
          { q: "¿Cuánto tarda la emisión de la licencia?", a: "La emisión de la credencial ReBA la resolvemos en 2 a 5 días hábiles, siempre que tengas la habilitación municipal vigente (requisito excluyente). Si el comercio no tiene habilitación, primero hay que gestionarla (o regularizarla) y después va el ReBA." },
          { q: "¿Cuánto dura la licencia?", a: "La vigencia es anual. Nosotros coordinamos la renovación hasta 7 días antes del vencimiento para evitar que el local quede sin licencia vigente. La renovación no es automática: hay que gestionarla activamente. Si sos cliente recurrente, te avisamos cuando corresponde renovar." },
          { q: "¿Qué pasa si vendo alcohol sin ReBA o con la licencia vencida?", a: "Riesgos serios. Clausura inmediata del local entre 10 y 30 días según la gravedad. Decomiso de todo el stock de bebidas alcohólicas (no se devuelve). Multas millonarias del Ministerio de Seguridad. Antecedentes que dificultan renovaciones futuras: un local con historial de venta sin licencia tiene el proceso mucho más trabado para obtener ReBA en el futuro." },
          { q: "¿La habilitación municipal me habilita automáticamente a vender alcohol?", a: "No. Son dos trámites distintos. La habilitación municipal te permite operar el rubro en general. La licencia ReBA es específica para venta de alcohol y la emite la Provincia, no el Municipio. Podés tener habilitación perfecta y aun así necesitás ReBA si vendés bebidas alcohólicas. Es un error frecuente que genera clausuras." },
          { q: "¿Qué documentación necesito?", a: "Legajo de habilitación municipal vigente (excluyente), CUIT del titular, categoría de licencia que corresponde a tu actividad, dirección exacta del local dentro del Partido de La Plata. Si tenés habilitación municipal en gestión nuestra, ya tenemos todos los datos." },
          { q: "¿Qué entregables recibo?", a: "Credencial ReBA oficial con código QR (se exhibe en el local), comprobante de pago de la tasa provincial, guía informativa sobre horarios permitidos y prohibiciones vigentes para tu categoría. La credencial es la que piden en cualquier inspección." },
          { q: "¿Cubren ReBA solo en La Plata?", a: "Sí. Tramitamos ReBA para locales dentro del Partido de La Plata. Para Berisso, Ensenada u otros partidos, cada Municipalidad tiene el circuito propio y nosotros no gestionamos ahí. Para eventos específicos (ReBA Eventual) también cubrimos solo los que se realizan dentro del Partido de La Plata." },
        ],
      }] },
    ]
  },
];

const GOOGLE_REVIEWS_URL = "https://search.google.com/local/reviews?placeid=ChIJC_1VIJTnopURA3KooOBAkiE";
const REVIEWS = [
  { text: "Muy buen servicio. Me ayudaron con inscripciones de divorcios de otras jurisdicciones. Informes de dominio que en 7 días los tuve en mano. Excelente servicio. Muy recomendable.", author: "Dr. Néstor Reyna", rubro: "Profesional", stars: 5 },
  { text: "Excelente servicio. Desde Santa Fe, inscribir en Mar del Plata un divorcio no es fácil. Lo resolvieron en tres días y a un costo inigualable. Gracias infinitas!", author: "Dra. Graciela Vizcay Gómez", rubro: "Profesional", stars: 5 },
  { text: "Soy de la provincia de San Luis. Me comuniqué con esta gestoría y no tengo palabras de agradecimiento: excelente atención, rapidez y da mucha confianza. Recomendable.", author: "Vanesa Lorena Torres", rubro: "Desde San Luis", stars: 5 },
  { text: "He usado el servicio de Gestor La Plata varias veces en los últimos años, siempre me resolvieron en menos de 1 semana todos los casos. Algunas partidas en menos de 24hs. Servicio, comunicación y profesionalismo siempre impecables. 100% recomendable.", author: "Marisol Morresi", rubro: "Particular", stars: 5 },
  { text: "Santiago es un gestor rápido, eficaz, atento y educado. Lo súper recomiendo, más para los que no entendemos nada de estas cuestiones y necesitamos estar seguros y tranquilos. Gracias por todo!", author: "Veronica Tamplin", rubro: "Particular", stars: 5 },
  { text: "Servicio 100% recomendado. Gestión rápida, clara y efectiva. Conseguí mi partida en menos de una hora desde el extranjero. Muy profesionales.", author: "Karen Torrico Escobar", rubro: "Desde el exterior", stars: 5 },
  { text: "Le pedí un acta y en lugar de datos, lo que le di fue una leve pista. A los pocos días, me entrega el acta firmada. Un crack! Totalmente recomendable!", author: "Paola Añaños", rubro: "Particular", stars: 5 },
  { text: "Santiago estamos más que agradecidos. Superó ampliamente nuestras expectativas: confiable, eficiente, empático y profesional. El mejor gestor de La Plata!", author: "Keila Moreno", rubro: "Habilitación comercial", stars: 5 },
];

const FAQ = [
  { q: "¿Cómo puedo abonar?", a: "Transferencia bancaria o Mercado Pago. En gestiones largas, pagos por etapas." },
  { q: "¿Incluye las tasas y timbrados?", a: "Sí, el precio es final e incluye todos los honorarios y timbrados." },
  { q: "¿Los documentos son oficiales?", a: "Sí. Documentación emitida por los organismos con firma digital y código QR." },
  { q: "¿Cómo recibo el trámite?", a: "PDF por WhatsApp o e-mail. Si el organismo exige papel, coordinamos entrega en mano o mensajería." },
  { q: "¿Qué pasa si sale observado?", a: "Control riguroso previo para buscar el cero rechazo. Si es error nuestro: lo corregimos y reingresamos sin costo. Si es error del organismo: gestionamos hasta destrabarlo. Si hay datos incorrectos: te asesoramos en los pasos a seguir. Importante: cualquier observación extiende los plazos, incluso en urgentes." },
  { q: "¿Solo trabajan en La Plata?", a: "Gestionamos en toda la Provincia de Buenos Aires." },
];

// ─── UI ─────────────────────────────────────────────────────────────────────

const WAFloat = () => <a href={WA} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp" style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000, width: 60, height: 60, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.4)", transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>;

function CookieBanner({ onPrivacy }) {
  const [visible, setVisible] = useState(() => {
    try { return !window.__cookieConsent; } catch { return true; }
  });
  if (!visible) return null;
  const accept = () => { window.__cookieConsent = true; setVisible(false); };
  const reject = () => { window.__cookieConsent = false; setVisible(false); };
  return <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1100, background: "rgba(45,55,72,0.97)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "18px 24px", animation: "cookieSlide 0.4s ease-out" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(241,243,245,0.85)", margin: 0, flex: 1, minWidth: 280, lineHeight: 1.6 }}>
        Usamos cookies para asegurar que te damos la mejor experiencia en nuestra web. Si continuás usando este sitio, asumiremos que estás de acuerdo con ello.
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, flexWrap: "wrap" }}>
        <button onClick={accept} style={{ background: "#F4A261", color: "#fff", border: "none", borderRadius: 6, padding: "10px 22px", fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "#E08A48"} onMouseLeave={e => e.currentTarget.style.background = "#F4A261"}>Aceptar</button>
        <button onClick={reject} style={{ background: "transparent", color: "rgba(241,243,245,0.6)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, padding: "10px 22px", fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "#F1F3F5"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(241,243,245,0.6)"; }}>Rechazar</button>
        <button onClick={onPrivacy} style={{ background: "none", border: "none", color: "#F4A261", fontFamily: "'Inter',sans-serif", fontSize: 13, cursor: "pointer", textDecoration: "underline", padding: "10px 4px" }}>Política de privacidad</button>
      </div>
    </div>
  </div>;
}
const Bdg = ({ children, c = "#3B6B8A", lg }) => <span style={{ display: "inline-block", padding: lg ? "5px 14px" : "3px 10px", borderRadius: lg ? 6 : 4, background: c + "18", color: c, fontSize: lg ? 13 : 11, fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", fontFamily: "'Poppins',sans-serif" }}>{children}</span>;

function Btn({ children, v = "primary", href, onClick, style: s = {}, sm, full }) {
  const b = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, border: "none", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: sm ? 13 : 15, letterSpacing: "1px", textTransform: "uppercase", textDecoration: "none", borderRadius: 6, padding: sm ? "10px 18px" : "15px 30px", transition: "all 0.25s", width: full ? "100%" : "auto", ...s };
  const vs = { primary: { background: "#F4A261", color: "#fff", boxShadow: "0 4px 16px rgba(244,162,97,0.35)" }, outline: { background: "transparent", color: "#1D3557", border: "2px solid #1D3557" }, outlineW: { background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.4)" }, ghost: { background: "transparent", color: "#3B6B8A" }, green: { background: "#25D366", color: "#fff", boxShadow: "0 4px 16px rgba(37,211,102,0.35)" } };
  const hc = { primary: "#E08A48", green: "#1fb855" };
  const p = { style: { ...b, ...vs[v] }, onClick, onMouseEnter: e => { if (hc[v]) e.currentTarget.style.background = hc[v]; e.currentTarget.style.transform = "translateY(-1px)"; }, onMouseLeave: e => { if (vs[v]?.background && hc[v]) e.currentTarget.style.background = vs[v].background; e.currentTarget.style.transform = "translateY(0)"; } };
  return href ? <a href={href} target="_blank" rel="noopener noreferrer" {...p}>{children}</a> : <button {...p}>{children}</button>;
}

function Card({ children, style: s = {}, onClick, hover = true }) { const [h, sh] = useState(false); return <div onClick={onClick} onMouseEnter={() => sh(true)} onMouseLeave={() => sh(false)} style={{ background: "#fff", borderRadius: 12, padding: 28, boxShadow: h && hover ? "0 12px 40px rgba(29,53,87,0.12)" : "0 2px 12px rgba(29,53,87,0.06)", transition: "all 0.35s", cursor: onClick ? "pointer" : "default", transform: h && hover && onClick ? "translateY(-3px)" : "none", ...s }}>{children}</div>; }
const ST = ({ badge, title, sub, light, center, badgeColor }) => <div style={{ marginBottom: 48, maxWidth: center ? 900 : 700, textAlign: center ? "center" : "left", margin: center ? "0 auto 48px" : undefined }}>{badge && <Bdg c={badgeColor || (light ? "#F4A261" : "#3B6B8A")} lg>{badge}</Bdg>}<h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "clamp(26px,3.5vw,36px)", color: light ? "#fff" : "#1D3557", margin: "14px 0 8px", lineHeight: 1.2 }}>{title}</h2>{sub && <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: light ? "rgba(255,255,255,0.75)" : "#3B6B8A", lineHeight: 1.6, margin: 0 }}>{sub}</p>}</div>;
function Acc({ label, icon, children, open: dflt }) { const [o, so] = useState(dflt || false); return <div style={{ border: "1px solid #E9ECEF", borderRadius: 10, overflow: "hidden", marginBottom: 8, background: o ? "#FAFBFC" : "#fff" }}><div onClick={() => so(!o)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", cursor: "pointer" }}><span style={{ fontSize: 20 }}>{icon}</span><span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 15, color: "#1D3557", flex: 1 }}>{label}</span><ChevronDown size={18} color="#3B6B8A" style={{ transform: o ? "rotate(180deg)" : "", transition: "0.3s" }} /></div>{o && <div style={{ padding: "0 20px 20px 52px" }}>{children}</div>}</div>; }
function FI({ q, a }) { const [o, so] = useState(false); return <div style={{ borderBottom: "1px solid #E9ECEF", padding: "20px 0" }}><div onClick={() => so(!o)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", gap: 16 }}><h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: 16, color: "#1D3557", margin: 0 }}>{q}</h3><ChevronDown size={20} color="#3B6B8A" style={{ transform: o ? "rotate(180deg)" : "", transition: "0.3s", flexShrink: 0 }} /></div>{o && <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "#3B6B8A", lineHeight: 1.6, margin: "12px 0 0" }}>{a}</p>}</div>; }
const scopeLabel = (s) => s === "LP" ? "Exclusivo La Plata" : "Alcance Provincial";
const scopeColor = (s) => s === "LP" ? "#F4A261" : "#3B6B8A";

// ─── ENHANCED LANDING (UNIVERSAL) with PREGUNTA H1 + TAGLINE H2 ────────────

function EnhancedLanding({ service, sub, landing: L, nav }) {
  const hasRisks = L.riesgos && L.riesgos.length > 0;
  const hasDatosGroups = L.datosGroups && L.datosGroups.length > 0;
  const plazosArr = L.plazos || [];
  const firstPlazo = plazosArr[0];
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 900);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  useEffect(() => { document.title = L.seoTitle || `${L.title} | Gestor La Plata`; }, [L]);

  return <div>
    <section style={{ background: "#1D3557", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "130px 24px 80px", position: "relative", zIndex: 1 }}>
        <button onClick={() => sub.landings.length > 1 ? nav("sub", service.id, sub.id) : nav("block", service.id)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontFamily: "'Inter',sans-serif", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, marginBottom: 20, padding: 0 }}><ChevronLeft size={16} /> {sub.landings.length > 1 ? sub.title : service.title}</button>
        <Bdg c={scopeColor(service.scope)} lg>{scopeLabel(service.scope)}</Bdg>
        {/* H1: Pregunta humana */}
        <h1 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "clamp(28px,4.5vw,46px)", color: "#F1F3F5", margin: "18px 0 12px", lineHeight: 1.1, maxWidth: 700 }}>{L.pregunta}</h1>
        {/* H2: Término técnico SEO */}
        <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: "clamp(16px,2vw,20px)", color: "#F4A261", margin: "0 0 16px", letterSpacing: "0.5px" }}>{L.tagline}</h2>
        {/* Bajada en lenguaje simple */}
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: "rgba(241,243,245,0.75)", lineHeight: 1.7, maxWidth: 600 }}>{L.intro}</p>
        <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
          <Btn href={wl(L.wa)}><MessageCircle size={18} /> Pedí tu presupuesto</Btn>
          {hasRisks && <Btn v="outlineW" onClick={() => document.getElementById("riesgos")?.scrollIntoView({ behavior: "smooth" })}><AlertTriangle size={16} /> ¿Qué riesgos corrés?</Btn>}
        </div>
        <div style={{ display: "flex", gap: 24, marginTop: 32, flexWrap: "wrap" }}>
          {plazosArr.slice(0, 3).map((pl, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}><Timer size={16} color="#F4A261" /><span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(241,243,245,0.55)" }}>{pl.tipo}: {pl.tiempo}</span></div>)}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><FileText size={16} color="#F4A261" /><span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(241,243,245,0.55)" }}>Documentación oficial</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Shield size={16} color="#F4A261" /><span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(241,243,245,0.55)" }}>Seguimiento incluido</span></div>
        </div>
      </div>
    </section>

    {hasRisks && <section id="riesgos" style={{ background: "linear-gradient(135deg, #7f1d1d, #991b1b, #b91c1c)", padding: "56px 24px", position: "relative", overflow: "hidden", scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}><div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}><AlertTriangle size={28} color="#FCA5A5" /></div><div><h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "clamp(22px,3vw,30px)", color: "#fff", margin: 0 }}>¡No arriesgues tu inversión!</h2><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", margin: 0 }}>Riesgos de no gestionar este trámite a tiempo:</p></div></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 28 }}>{L.riesgos.map((r, i) => { const Ic = r.icon; return <div key={i} style={{ background: "rgba(0,0,0,0.2)", borderRadius: 12, padding: 22, border: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 14, alignItems: "flex-start" }}><div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(252,165,165,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic size={20} color="#FCA5A5" /></div><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(255,255,255,0.9)", lineHeight: 1.5, margin: 0 }}>{r.text}</p></div>; })}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 32, padding: "20px 24px", background: "rgba(0,0,0,0.25)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", flexWrap: "wrap" }}><p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 16, color: "#fff", margin: 0, flex: 1, minWidth: 200 }}>Gestioná a tiempo y evitá problemas costosos.</p><Btn href={wl(L.wa)}><MessageCircle size={18} /> Consultá ahora</Btn></div>
      </div>
    </section>}

    <section style={{ padding: "64px 24px", background: "#F1F3F5" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 380px", gap: 32, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {(hasDatosGroups || (L.datos && L.datos.length > 0)) && <Card hover={false} style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "28px 28px 4px" }}><h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 22, color: "#1D3557", margin: "0 0 6px", display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 36, height: 36, borderRadius: 8, background: "#3B6B8A14", display: "flex", alignItems: "center", justifyContent: "center" }}><FileText size={18} color="#3B6B8A" /></div>{L.id === "apostilla-l" ? "¿Qué documentación necesitás Apostillar?" : "¿Qué datos necesitás?"}</h3>{L.id !== "apostilla-l" && <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#3B6B8A", margin: "0 0 16px" }}>Si tenés dudas, envianos lo que tengas y nosotros nos ocupamos.</p>}</div>
            {hasDatosGroups ? <div style={{ padding: "0 20px 8px" }}>{L.datosGroups.map((g, i) => <Acc key={i} label={g.label} icon={g.icon} open={i === 0}>{g.items.map((item, j) => <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}><CheckCircle2 size={15} color="#3B6B8A" style={{ flexShrink: 0 }} /><span style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#212529" }}>{item}</span></div>)}</Acc>)}</div>
            : <div style={{ padding: "0 28px 16px" }}>{L.datos.map((d, i) => <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}><CheckCircle2 size={15} color="#3B6B8A" style={{ marginTop: 2, flexShrink: 0 }} /><span style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#212529" }}>{d}</span></div>)}</div>}
            {L.id !== "apostilla-l" && <div style={{ padding: "16px 28px 24px", background: "#F8F9FA", borderTop: "1px solid #E9ECEF" }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}><Upload size={16} color="#F4A261" /><span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 14, color: "#1D3557" }}>¿No tenés todos los datos? No importa.</span></div><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#3B6B8A", margin: "0 0 14px" }}>Envianos la documentación que tengas y nosotros nos encargamos.</p><Btn sm full href={wl(L.waDatos)} v="green"><MessageCircle size={14} /> Enviar datos por WhatsApp</Btn></div>}
          </Card>}
          <Card hover={false}><h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 22, color: "#1D3557", margin: "0 0 20px", display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 36, height: 36, borderRadius: 8, background: "#3B6B8A14", display: "flex", alignItems: "center", justifyContent: "center" }}><Clock size={18} color="#3B6B8A" /></div>Plazos de gestión</h3><div style={{ display: "grid", gridTemplateColumns: isMobile ? (plazosArr.length > 1 ? "repeat(2, 1fr)" : "1fr") : (plazosArr.length > 2 ? "repeat(3, 1fr)" : `repeat(${plazosArr.length}, 1fr)`), gap: 12 }}>{plazosArr.map((p, i) => { const Ic = p.icon; const isU = p.tipo.toLowerCase().includes("urgente") || p.tipo.toLowerCase().includes("express") || p.tipo.toLowerCase().includes("exprés"); return <div key={i} style={{ padding: 20, borderRadius: 10, background: isU ? "#FFF8F0" : "#F8F9FA", border: `1px solid ${isU ? "#F4A26130" : "#E9ECEF"}` }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><Ic size={18} color={isU ? "#F4A261" : "#3B6B8A"} /><span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 14, color: "#1D3557" }}>{p.tipo}</span></div><span style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, fontWeight: 700, color: isU ? "#F4A261" : "#3B6B8A" }}>{p.tiempo}</span></div>; })}</div></Card>
          {L.entrega && L.entrega.length > 0 && <Card hover={false}><h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 22, color: "#1D3557", margin: "0 0 20px", display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 36, height: 36, borderRadius: 8, background: "#25D36614", display: "flex", alignItems: "center", justifyContent: "center" }}><BadgeCheck size={18} color="#25D366" /></div>¿Qué recibís al finalizar?</h3>{L.entrega.map((e, i) => <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}><CheckCircle2 size={16} color="#25D366" style={{ marginTop: 2, flexShrink: 0 }} /><span style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "#212529", lineHeight: 1.5 }}>{e}</span></div>)}</Card>}
          <div style={{ background: "#1D3557", borderRadius: 14, padding: 36, textAlign: "center" }}><h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 22, color: "#F1F3F5", margin: "0 0 10px" }}>¿Listo para avanzar?</h3><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "rgba(241,243,245,0.65)", margin: "0 0 24px" }}>Presupuesto sin cargo. Respondemos en minutos.</p><div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}><Btn href={wl(L.wa)}><MessageCircle size={18} /> Pedí tu presupuesto</Btn><Btn sm href={wl(L.waAsesor)} v="outlineW"><MessageCircle size={14} /> Duda técnica</Btn></div></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, position: isMobile ? "static" : "sticky", top: 88 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: 28, boxShadow: "0 4px 20px rgba(29,53,87,0.08)", border: "2px solid #F4A261" }}><div style={{ textAlign: "center", marginBottom: 20 }}><div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 18, color: "#1D3557" }}>Solicitá tu trámite</div><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#3B6B8A", margin: "4px 0 0" }}>Presupuesto sin cargo · Respuesta inmediata</p></div><Btn full href={wl(L.wa)} style={{ marginBottom: 10 }}><MessageCircle size={18} /> Pedir presupuesto</Btn><Btn full sm href={wl(L.waDatos)} v="outline"><Upload size={14} /> Enviar datos / foto</Btn><div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>{plazosArr.slice(0, 3).map((p, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0" }}><Timer size={14} color="#3B6B8A" /><span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#3B6B8A" }}>{p.tipo}: {p.tiempo}</span></div>)}<div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0" }}><BadgeCheck size={14} color="#3B6B8A" /><span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#3B6B8A" }}>Documentación oficial</span></div><div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0" }}><Shield size={14} color="#3B6B8A" /><span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#3B6B8A" }}>Asesoramiento incluido</span></div></div></div>
          {L.review && <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}><div style={{ display: "flex", gap: 2, marginBottom: 10 }}>{[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#F4A261" color="#F4A261" />)}</div><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#212529", lineHeight: 1.6, margin: "0 0 12px", fontStyle: "italic" }}>"{L.review.text}"</p><span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 13, color: "#1D3557" }}>{L.review.author} · {L.review.rubro}</span></div>}
          <div style={{ background: "#F8F9FA", borderRadius: 14, padding: 24, border: "1px solid #E9ECEF", textAlign: "center" }}><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#3B6B8A", margin: "0 0 12px" }}>¿Precisás asesoramiento antes de pedirlo?</p><Btn sm full href={wl(L.waAsesor)} v="ghost"><MessageCircle size={14} /> Consultá con un Asesor</Btn></div>
        </div>
      </div>
    </section>

    {L.faq && L.faq.length > 0 && <section style={{ background: "#fff", padding: "64px 24px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "clamp(24px,3.5vw,34px)", color: "#1D3557", margin: "0 0 10px" }}>Preguntas frecuentes</h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "#3B6B8A", margin: 0 }}>Todo lo que necesitás saber sobre {L.tagline}.</p>
        </div>
        <div>{L.faq.map((f, i) => <FI key={i} q={f.q} a={f.a} />)}</div>
        <div style={{ marginTop: 36, padding: "28px 24px", background: "#F8F9FA", borderRadius: 12, border: "1px solid #E9ECEF", textAlign: "center" }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "#3B6B8A", margin: "0 0 14px" }}>¿Tu pregunta no está acá? Consultanos sin compromiso.</p>
          <Btn sm href={wl(L.waAsesor)} v="green"><MessageCircle size={14} /> Hacé tu consulta por WhatsApp</Btn>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": L.faq.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
        }) }} />
      </div>
    </section>}
  </div>;
}

// ─── HOME ───────────────────────────────────────────────────────────────────

function HomePage({ nav }) {
  useEffect(() => { document.title = "Gestor La Plata | Gestoría Profesional en La Plata y PBA"; }, []);
  return <div>
    <section style={{ background: "#1D3557", minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
      
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "140px 24px 120px", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(244,162,97,0.12)", borderRadius: 30, padding: "6px 16px", marginBottom: 28 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: "#25D366", animation: "pulse 2s infinite" }} /><span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#F4A261", fontWeight: 500 }}>Consultas abiertas · Respondemos en minutos</span></div>
          <h1 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "clamp(34px,4.5vw,52px)", color: "#F1F3F5", margin: "0 0 20px", lineHeight: 1.1 }}>La burocracia<br /><span style={{ color: "#F4A261" }}>no tiene por qué</span><br />frenarte.</h1>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, color: "rgba(241,243,245,0.7)", lineHeight: 1.7, maxWidth: 480, margin: "0 0 36px" }}>Resolvemos tus trámites registrales, municipales y habilitaciones comerciales en La Plata y toda la Provincia. Sin vueltas, sin moverte de tu casa.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}><Btn href={wl("Hola! Quiero hacer una consulta.")}><MessageCircle size={18} /> Consultá ahora</Btn><Btn v="outlineW" onClick={() => document.getElementById("srv")?.scrollIntoView({ behavior: "smooth" })}>Ver servicios <ArrowDown size={16} /></Btn></div>
          <div style={{ marginTop: 28, display: "inline-flex", alignItems: "center", gap: 12, padding: "10px 16px", background: "rgba(255,255,255,0.04)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", flexWrap: "wrap" }}><div style={{ display: "flex", gap: 2 }}>{[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#F4A261" color="#F4A261" />)}</div><span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(241,243,245,0.7)" }}><strong style={{ color: "#F1F3F5", fontWeight: 600 }}>5.0</strong> en Google · +312 reseñas verificadas</span><a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#F4A261", fontWeight: 600, textDecoration: "none" }}>Ver reseñas →</a></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>{[{ icon: BadgeCheck, n: "+2.000", l: "Trámites gestionados", bg: "rgba(69,123,157,0.12)" }, { icon: Timer, n: "48hs", l: "Informes urgentes", bg: "rgba(244,162,97,0.12)" }, { icon: Shield, n: "100%", l: "Documentación oficial", bg: "rgba(69,123,157,0.12)" }, { icon: Smartphone, n: "24/7", l: "Seguimiento digital", bg: "rgba(244,162,97,0.12)" }].map((s, i) => { const I = s.icon; return <div key={i} style={{ background: s.bg, borderRadius: 14, padding: 22, border: "1px solid rgba(255,255,255,0.06)" }}><I size={22} color="#F4A261" style={{ marginBottom: 10 }} /><div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 28, color: "#F1F3F5", lineHeight: 1 }}>{s.n}</div><div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(241,243,245,0.55)", marginTop: 4 }}>{s.l}</div></div>; })}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 20px", background: "rgba(255,255,255,0.04)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)" }}><div style={{ width: 52, height: 52, borderRadius: "50%", background: "#F4A261", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 22, color: "#132437" }}>S</span></div><div><div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 15, color: "#F1F3F5", marginBottom: 2 }}>Santiago A. Ippolito</div><div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(241,243,245,0.65)", marginBottom: 2 }}>Gestor Administrativo y Judicial · Mat. 10001</div><div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(241,243,245,0.45)" }}>CUIT 20-32584955-0</div></div></div>
        </div>
      </div>
    </section>
    <section id="srv" style={{ padding: "80px 24px", background: "#F1F3F5" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}><ST badge="Nuestros servicios" title="Encontrá la solución para tu trámite" sub="5 áreas de gestión especializadas." center />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 20 }}>{SERVICES.map(s => { const I = s.icon; return <Card key={s.id} onClick={() => nav("block", s.id)} style={{ borderTop: `4px solid ${s.color}`, padding: 0, overflow: "hidden" }}><div style={{ padding: "28px 28px 0" }}><div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}><div style={{ width: 52, height: 52, borderRadius: 12, background: s.color + "12", display: "flex", alignItems: "center", justifyContent: "center" }}><I size={24} color={s.color} /></div><Bdg c={scopeColor(s.scope)}>{scopeLabel(s.scope)}</Bdg></div><h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 19, color: "#1D3557", margin: "0 0 8px" }}>{s.title}</h3><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#3B6B8A", lineHeight: 1.6, margin: 0 }}>{s.desc}</p></div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, padding: "16px 28px", margin: "16px 0 0", borderTop: "1px solid #F1F3F5", background: "#FAFBFC" }}>{s.subs.slice(0, 3).map(sub => <span key={sub.id} style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#3B6B8A", background: "#EDF2F7", padding: "3px 10px", borderRadius: 20 }}>{sub.title}</span>)}{s.subs.length > 3 && <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#F4A261", fontWeight: 600, padding: "3px 10px" }}>+{s.subs.length - 3} más</span>}</div>
        <div style={{ padding: "0 28px 20px", display: "flex", alignItems: "center", gap: 6, color: "#F4A261", fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 600 }}>VER TODOS <ArrowRight size={16} /></div></Card>; })}</div>
      <div style={{ background: "#fff", borderRadius: 14, padding: 32, marginTop: 32, border: "1px solid #E9ECEF", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}><div><h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 18, color: "#1D3557", margin: "0 0 4px" }}>¿No sabés qué trámite necesitás?</h3><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#3B6B8A", margin: 0 }}>Escribinos y te orientamos sin cargo.</p></div><Btn sm href={wl("Hola! No estoy seguro qué trámite necesito. ¿Podrían orientarme?")}><MessageCircle size={14} /> Consultá ahora</Btn></div>
    </div></section>
    <section style={{ padding: "80px 24px", background: "#fff" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}><ST badge="Confianza y transparencia" title={<>¿Por qué contratarnos<br />sin conocernos?</>} sub="Estas son las razones concretas y verificables por las que miles de personas confían en nosotros cada año." center />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>{[
        { icon: Shield, t: "Matrícula N° 10001", d: "Gestor Administrativo y Judicial habilitado ante los organismos de la Provincia de Buenos Aires. Podés verificarlo públicamente." },
        { icon: Users, t: "+2.000 trámites gestionados", d: "Más de 2.000 gestiones completadas para particulares, escribanías, estudios jurídicos y comerciantes de toda la Provincia." },
        { icon: Star, t: "+312 reseñas 5 estrellas en Google", d: "Cada reseña está verificada por Google y es pública. Podés leerlas antes de contratar." },
        { icon: Smartphone, t: "Documentación 100% oficial", d: "Todos los documentos son emitidos directamente por los organismos (RPBA, ARBA, Registro Civil, APR). Tienen firma digital y código QR." },
        { icon: MessageCircle, t: "Seguimiento activo por WhatsApp", d: "Informamos el estado de cada gestión y respondemos durante todo el proceso." },
        { icon: Shield, t: "Precio final, sin sorpresas", d: "El presupuesto incluye honorarios y timbrados. No hay costos ocultos. Sabés exactamente lo que pagás antes de confirmar." }
      ].map((d, i) => { const I = d.icon; return <div key={i} style={{ background: "#F8F9FA", borderRadius: 14, padding: 28, border: "1px solid #E9ECEF", display: "flex", gap: 16, alignItems: "flex-start" }}><div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(244,162,97,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><I size={22} color="#F4A261" /></div><div><h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 15, color: "#1D3557", margin: "0 0 8px" }}>{d.t}</h3><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#3B6B8A", lineHeight: 1.6, margin: 0 }}>{d.d}</p></div></div>; })}</div>
      <div style={{ background: "#1D3557", borderRadius: 14, padding: "24px 32px", marginTop: 32, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}><div><h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 18, color: "#F1F3F5", margin: "0 0 4px" }}>¿Querés verificar nuestra identidad?</h3><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(241,243,245,0.6)", margin: 0 }}>Calle 49 N° 1295, La Plata, Buenos Aires</p></div><Btn sm href={GOOGLE_REVIEWS_URL}><Star size={14} /> Ver reseñas en Google</Btn></div>
    </div></section>
    <section style={{ padding: "80px 24px", background: "#F1F3F5" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}><ST badge="Nuestro compromiso" badgeColor="#25D366" title={<>Garantías escritas,<br />no promesas vacías</>} sub="Esto es lo que nos comprometemos a cumplir en cada gestión, sin excepciones." center />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, maxWidth: 1000, margin: "0 auto" }}>{[
        { n: "01", c: "#25D366", t: "Si el error es nuestro, lo corregimos sin costo", d: "Antes de presentar, revisamos cada dato y requisito. Si hay un error imputable a nuestra gestión, lo corregimos y reingresamos sin costo adicional." },
        { n: "02", c: "#1D3557", t: "Presupuesto cerrado antes de empezar", d: "Acordamos el precio total por adelantado. El monto que cotizamos incluye honorarios y timbrados." },
        { n: "03", c: "#F4A261", t: "Documentación oficial", d: "Todo lo que entregamos es documentación emitida por el organismo correspondiente, con firma digital y/o código QR verificable." }
      ].map((g, i) => <div key={i} style={{ background: "#fff", borderRadius: 14, padding: 24, position: "relative", border: "1px solid #E9ECEF", borderTop: `4px solid ${g.c}` }}><div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 36, color: g.c, opacity: 0.25, lineHeight: 1, marginBottom: 12 }}>{g.n}</div><div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}><CheckCircle2 size={18} color={g.c} style={{ flexShrink: 0, marginTop: 2 }} /><h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 15, color: "#1D3557", margin: 0, lineHeight: 1.3 }}>{g.t}</h3></div><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#3B6B8A", lineHeight: 1.65, margin: 0 }}>{g.d}</p></div>)}</div>
    </div></section>
    <section style={{ padding: "80px 24px", background: "#fff" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}><ST badge="Testimonios" title="Lo que dicen quienes ya confiaron en nosotros" center /><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>{REVIEWS.map((r, i) => <div key={i} style={{ background: "#F8F9FA", borderRadius: 14, padding: 32, position: "relative", border: "1px solid #E9ECEF" }}><div style={{ position: "absolute", top: 16, right: 20, fontFamily: "Georgia,serif", fontSize: 72, color: "#3B6B8A", opacity: 0.08, lineHeight: 1 }}>"</div><div style={{ display: "flex", gap: 2, marginBottom: 16 }}>{[...Array(r.stars)].map((_, j) => <Star key={j} size={16} fill="#F4A261" color="#F4A261" />)}</div><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "#212529", lineHeight: 1.7, margin: "0 0 20px", position: "relative", zIndex: 1 }}>{r.text}</p><div style={{ display: "flex", alignItems: "center", gap: 12 }}><div style={{ width: 40, height: 40, borderRadius: "50%", background: "#1D3557", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 16, color: "#F1F3F5" }}>{r.author[0]}</span></div><div><div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 14, color: "#1D3557" }}>{r.author}</div><div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#3B6B8A" }}>{r.rubro}</div></div></div></div>)}</div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Btn sm href={GOOGLE_REVIEWS_URL} v="outline"><Star size={14} /> Ver las +312 reseñas en Google</Btn>
          </div>
        </div></section>
    <section style={{ padding: "80px 24px", background: "#1D3557", position: "relative", overflow: "hidden" }}><div style={{ position: "absolute", top: 0, right: 0, width: "40%", height: "100%", background: "linear-gradient(135deg, rgba(69,123,157,0.1), transparent)" }} /><div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}><ST badge="Diferenciales" title="¿Por qué elegirnos?" light center /><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>{[{ icon: MapPin, t: "Enfoque 100% Local", d: "Dominamos cada dependencia de La Plata y PBA." }, { icon: Zap, t: "Agilidad Real", d: "Presencia diaria en mesas de entrada. Respuesta rápida garantizada." }, { icon: Shield, t: "Rigurosidad Técnica", d: "Revisamos todo antes de presentar. Cero rechazos." }, { icon: Smartphone, t: "100% Digital", d: "Todo por WhatsApp. Seguimiento en tiempo real." }].map((d, i) => { const I = d.icon; return <div key={i} style={{ padding: 32, borderRadius: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}><div style={{ width: 48, height: 48, borderRadius: 10, background: "rgba(244,162,97,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}><I size={24} color="#F4A261" /></div><h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 18, color: "#F1F3F5", margin: "0 0 8px" }}>{d.t}</h3><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(241,243,245,0.6)", lineHeight: 1.7, margin: 0 }}>{d.d}</p></div>; })}</div></div></section>
    <section style={{ padding: "80px 24px", background: "#F1F3F5" }}><div style={{ maxWidth: 1000, margin: "0 auto" }}><ST badge="Proceso" title="Cómo Trabajamos" sub="4 pasos. Sin moverte de tu casa." center /><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>{[{ n: "01", t: "Consulta", d: "Escribinos por WhatsApp. Te pasamos presupuesto sin cargo.", icon: Send, c: "#F4A261" }, { n: "02", t: "Confirmación", d: "Abonás por transferencia o Mercado Pago.", icon: CircleDollarSign, c: "#3B6B8A" }, { n: "03", t: "Gestión", d: "Ingresamos y hacemos seguimiento activo.", icon: Search, c: "#1D3557" }, { n: "04", t: "Entrega", d: "Vía WhatsApp o Correo electrónico.", icon: BadgeCheck, c: "#25D366" }].map((s, i) => { const I = s.icon; return <div key={i} style={{ textAlign: "center", padding: "20px 24px" }}><div style={{ width: 70, height: 70, borderRadius: "50%", background: s.c, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: `0 8px 24px ${s.c}33`, position: "relative" }}><I size={28} color="#fff" /><div style={{ position: "absolute", top: -6, right: -6, width: 26, height: 26, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 11, color: s.c, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>{s.n}</div></div><h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 17, color: "#1D3557", margin: "0 0 8px" }}>{s.t}</h3><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#3B6B8A", lineHeight: 1.6, margin: 0 }}>{s.d}</p></div>; })}</div><div style={{ textAlign: "center", marginTop: 40 }}><Btn href={wl("Hola! Quiero iniciar un trámite.")} v="green"><MessageCircle size={18} /> Empezá tu trámite ahora</Btn></div></div></section>
    <section style={{ padding: "80px 24px", background: "#fff" }}><div style={{ maxWidth: 800, margin: "0 auto" }}><ST badge="FAQ" title="Preguntas Frecuentes" center />{FAQ.map((f, i) => <FI key={i} q={f.q} a={f.a} />)}<div style={{ textAlign: "center", marginTop: 32 }}><Btn sm href={wl("Hola! Tengo una duda.")} v="outline"><MessageCircle size={14} /> Consultá con un Asesor</Btn></div></div></section>
    <section style={{ padding: "60px 24px", background: "#1D3557" }}><div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}><h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "clamp(24px,3.5vw,34px)", color: "#F1F3F5", margin: "0 0 12px" }}>¿Listo para resolver tu trámite?</h2><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(241,243,245,0.65)", margin: "0 0 32px" }}>Presupuesto sin cargo. Respondemos en minutos.</p><div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}><Btn href={wl("Hola! Quiero hacer una consulta.")}><MessageCircle size={18} /> Consultá ahora</Btn><Btn v="outlineW" onClick={() => document.getElementById("srv")?.scrollIntoView({ behavior: "smooth" })}>Ver servicios <ArrowDown size={16} /></Btn></div></div></section>
  </div>;
}

// ─── BLOCK / SUB / ABOUT ────────────────────────────────────────────────────

function BlockPage({ service: s, nav }) {
  useEffect(() => { document.title = `${s.title} | Gestor La Plata`; }, [s]);
  return <div>
    <section style={{ background: "linear-gradient(135deg, #1D3557, #264673)", padding: "130px 24px 70px" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}><button onClick={() => nav("home")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontFamily: "'Inter',sans-serif", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, marginBottom: 20, padding: 0 }}><ChevronLeft size={16} /> Inicio</button><Bdg c={scopeColor(s.scope)} lg>{scopeLabel(s.scope)}</Bdg><h1 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "clamp(28px,4vw,44px)", color: "#F1F3F5", margin: "16px 0 8px" }}>{s.title}</h1><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: "rgba(241,243,245,0.7)", maxWidth: 600 }}>{s.desc}</p></div></section>
    <section style={{ padding: "60px 24px", background: "#F1F3F5" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}><ST badge="Servicios" title="Elegí el que necesitás" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20 }}>{s.subs.map(sub => <Card key={sub.id} onClick={() => nav("sub", s.id, sub.id)} style={{ borderLeft: `4px solid ${s.color}` }}>
        <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 18, color: "#1D3557", margin: "0 0 8px" }}>{sub.title}</h3>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#3B6B8A", lineHeight: 1.6, margin: "0 0 12px" }}>{sub.desc}</p>
        {/* Show human questions */}
        {sub.landings.length > 1 && <div style={{ marginBottom: 12 }}>{sub.landings.map((l, i) => <div key={i} style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#212529", marginBottom: 4, fontStyle: "italic" }}>{l.pregunta}</div>)}</div>}
        {sub.landings.length === 1 && <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#212529", margin: "0 0 12px", fontStyle: "italic" }}>{sub.landings[0].pregunta}</p>}
        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#F4A261", fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 600 }}>{"VER DETALLE"} <ChevronRight size={16} /></div>
      </Card>)}</div>
      <div style={{ background: "#fff", borderRadius: 14, padding: 32, marginTop: 32, border: "1px solid #E9ECEF", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}><div><h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 18, color: "#1D3557", margin: "0 0 4px" }}>¿No sabés qué trámite necesitás?</h3><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#3B6B8A", margin: 0 }}>Escribinos y te orientamos sin cargo.</p></div><Btn sm href={wl("Hola! No estoy seguro qué trámite necesito. ¿Podrían orientarme?")}><MessageCircle size={14} /> Consultá ahora</Btn></div>
    </div></section>
  </div>;
}

function SubPage({ service: s, sub, nav }) {
  useEffect(() => { document.title = `${sub.title} | Gestor La Plata`; }, [sub]);
  if (sub.landings.length === 1) return <EnhancedLanding service={s} sub={sub} landing={sub.landings[0]} nav={nav} />;
  return <div>
    <section style={{ background: "linear-gradient(135deg, #1D3557, #264673)", padding: "130px 24px 70px" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}><button onClick={() => nav("block", s.id)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontFamily: "'Inter',sans-serif", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, marginBottom: 20, padding: 0 }}><ChevronLeft size={16} /> {s.title}</button><h1 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "clamp(26px,4vw,40px)", color: "#F1F3F5", margin: "8px 0" }}>{sub.title}</h1><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(241,243,245,0.7)", maxWidth: 600 }}>{sub.desc}</p></div></section>
    <section style={{ padding: "60px 24px", background: "#F1F3F5" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}><ST badge="Trámites" title="Identificá tu situación" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>{sub.landings.map(l => <Card key={l.id} onClick={() => nav("landing", s.id, sub.id, l.id)} style={{ borderLeft: "4px solid #F4A261" }}>
        {/* Pregunta como título de tarjeta */}
        <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 17, color: "#1D3557", margin: "0 0 4px" }}>{l.pregunta}</h3>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: 13, color: "#F4A261", margin: "0 0 10px" }}>{l.title}</p>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#3B6B8A", lineHeight: 1.5, margin: "0 0 12px" }}>{l.intro.substring(0, 120)}...</p>
        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#F4A261", fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 600 }}>VER DETALLE <ChevronRight size={16} /></div>
      </Card>)}</div>
    </div></section>
  </div>;
}

function AboutPage({ nav }) {
  useEffect(() => { document.title = "Quiénes Somos | Gestor La Plata"; }, []);
  return <div>
    <section style={{ background: "linear-gradient(135deg, #1D3557, #264673)", padding: "130px 24px 70px" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}><button onClick={() => nav("home")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontFamily: "'Inter',sans-serif", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, marginBottom: 20, padding: 0 }}><ChevronLeft size={16} /> Inicio</button><Bdg c="#F4A261" lg>Nosotros</Bdg><h1 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "clamp(28px,4vw,44px)", color: "#F1F3F5", margin: "16px 0 12px" }}>Quiénes Somos</h1><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: "rgba(241,243,245,0.75)", maxWidth: 640 }}>Especialistas en Gestión Registral y Municipal.</p></div></section>
    <section style={{ padding: "60px 24px", background: "#F1F3F5" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}><ST badge="Nosotros" title="Quiénes Somos" /><Card hover={false} style={{ marginBottom: 24, borderLeft: "4px solid #3B6B8A" }}><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "#212529", lineHeight: 1.7 }}>Conocemos el sistema desde adentro. Somos un equipo de profesionales dedicados a destrabar y agilizar trámites complejos ante organismos provinciales (RPBA, ARBA, Registro de las Personas) y municipales (Municipalidad de La Plata / APR).</p><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "#212529", lineHeight: 1.7, marginTop: 16 }}>Nuestra misión es simple: absorber tu estrés administrativo para que la burocracia no detenga tus proyectos. Brindamos seguridad jurídica a particulares, comerciantes, escribanías y estudios jurídicos, garantizando que cada documento y habilitación cumpla con la normativa vigente.</p><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "#212529", lineHeight: 1.7, marginTop: 16 }}>Gestor La Plata está a cargo de Santiago A. Ippolito, Gestor Administrativo y Judicial Matricula 10001. Con sede en Calle 49 N° 1295, La Plata, Provincia de Buenos Aires. Contacto: contacto@gestorlaplata.com</p></Card><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>{[{ icon: MapPin, t: "Enfoque Local", d: "Dominamos los criterios de cada dependencia de La Plata y PBA." }, { icon: Zap, t: "Tiempos Optimizados", d: "Impulsamos tus trámites de forma constante. Resultados rápidos." }, { icon: Shield, t: "Rigurosidad", d: "Controlamos cada detalle y exigencia legal antes de presentar. Objetivo: cero rechazos." }, { icon: Users, t: "Atención Humana", d: "Un asesor asignado que conoce tu caso de principio a fin." }].map((d, i) => { const I = d.icon; return <Card key={i} hover={false} style={{ borderLeft: "4px solid #F4A261" }}><I size={24} color="#F4A261" style={{ marginBottom: 12 }} /><h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 15, color: "#1D3557", margin: "0 0 6px" }}>{d.t}</h3><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#3B6B8A", margin: 0 }}>{d.d}</p></Card>; })}</div></div></section>
    {/* Números */}
    <section style={{ padding: "60px 24px", background: "#1D3557" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>{[{ n: "+2.000", l: "Trámites gestionados", icon: BadgeCheck }, { n: "+312", l: "Reseñas 5 estrellas", icon: Star }, { n: "5", l: "Áreas de gestión", icon: FileText }, { n: "PBA", l: "Toda la Provincia", icon: Globe }].map((s, i) => { const I = s.icon; return <div key={i} style={{ textAlign: "center", padding: 28, borderRadius: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}><div style={{ width: 48, height: 48, borderRadius: 10, background: "rgba(244,162,97,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><I size={24} color="#F4A261" /></div><div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 32, color: "#F1F3F5", lineHeight: 1 }}>{s.n}</div><div style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(241,243,245,0.6)", marginTop: 8 }}>{s.l}</div></div>; })}</div></div></section>
    {/* Organismos */}
    <section style={{ padding: "60px 24px", background: "#F1F3F5" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}><ST badge="Alcance" title="Organismos donde operamos" /><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>{[{ icon: Landmark, t: "RPBA", d: "Registro de la Propiedad Inmueble de la Provincia de Buenos Aires" }, { icon: Building2, t: "ARBA / Catastro", d: "Agencia de Recaudación de Buenos Aires y Dirección de Catastro" }, { icon: ScrollText, t: "Registro de las Personas", d: "Casa Central en La Plata – Actas de toda la Provincia" }, { icon: Store, t: "Municipalidad de La Plata", d: "Habilitaciones comerciales, permisos y publicidad – APR" }].map((o, i) => { const I = o.icon; return <Card key={i} hover={false} style={{ borderLeft: "4px solid #3B6B8A" }}><I size={24} color="#3B6B8A" style={{ marginBottom: 12 }} /><h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 15, color: "#1D3557", margin: "0 0 6px" }}>{o.t}</h3><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#3B6B8A", margin: 0 }}>{o.d}</p></Card>; })}</div></div></section>
    {/* Testimonios */}
    <section style={{ padding: "60px 24px", background: "#fff" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}><ST badge="Testimonios" title="Lo que dicen nuestros clientes" /><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>{REVIEWS.slice(0, 3).map((r, i) => <div key={i} style={{ background: "#F8F9FA", borderRadius: 14, padding: 32, position: "relative", border: "1px solid #E9ECEF" }}><div style={{ position: "absolute", top: 16, right: 20, fontFamily: "Georgia,serif", fontSize: 72, color: "#3B6B8A", opacity: 0.08, lineHeight: 1 }}>"</div><div style={{ display: "flex", gap: 2, marginBottom: 16 }}>{[...Array(r.stars)].map((_, j) => <Star key={j} size={16} fill="#F4A261" color="#F4A261" />)}</div><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "#212529", lineHeight: 1.7, margin: "0 0 20px", position: "relative", zIndex: 1 }}>{r.text}</p><div style={{ display: "flex", alignItems: "center", gap: 12 }}><div style={{ width: 40, height: 40, borderRadius: "50%", background: "#1D3557", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 16, color: "#F1F3F5" }}>{r.author[0]}</span></div><div><div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 14, color: "#1D3557" }}>{r.author}</div><div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#3B6B8A" }}>{r.rubro}</div></div></div></div>)}</div><div style={{ textAlign: "center", marginTop: 32 }}><Btn sm href={GOOGLE_REVIEWS_URL} v="outline"><Star size={14} /> Ver las +312 reseñas en Google</Btn></div></div></section>
    {/* CTA final */}
    <section style={{ padding: "60px 24px", background: "#1D3557" }}><div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}><h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "clamp(24px,3.5vw,34px)", color: "#F1F3F5", margin: "0 0 12px" }}>¿Listo para resolver tu trámite?</h2><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(241,243,245,0.65)", margin: "0 0 32px" }}>Presupuesto sin cargo. Respondemos en minutos.</p><div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}><Btn href={wl("Hola! Quiero hacer una consulta.")}><MessageCircle size={18} /> Consultá ahora</Btn><Btn v="outlineW" onClick={() => nav("home")}>Ver servicios <ArrowRight size={16} /></Btn></div></div></section>
  </div>;
}

// ─── PRIVACY ────────────────────────────────────────────────────────────────

function PrivacyPage({ nav }) {
  useEffect(() => { document.title = "Política de Privacidad | Gestor La Plata"; }, []);
  const S = ({ t, children }) => <div style={{ marginBottom: 28 }}><h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 18, color: "#1D3557", margin: "0 0 10px" }}>{t}</h3><div style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "#212529", lineHeight: 1.7 }}>{children}</div></div>;
  return <div>
    <section style={{ background: "linear-gradient(135deg, #1D3557, #264673)", padding: "130px 24px 70px" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}><button onClick={() => nav("home")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontFamily: "'Inter',sans-serif", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, marginBottom: 20, padding: 0 }}><ChevronLeft size={16} /> Inicio</button><h1 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "clamp(28px,4vw,44px)", color: "#F1F3F5", margin: "8px 0 12px" }}>Política de Privacidad</h1><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: "rgba(241,243,245,0.75)", maxWidth: 640 }}>Última actualización: Abril 2026</p></div></section>
    <section style={{ padding: "60px 24px", background: "#F1F3F5" }}><div style={{ maxWidth: 800, margin: "0 auto" }}>
      <Card hover={false} style={{ marginBottom: 24 }}>
        <div style={{ background: "#E9ECEF", borderRadius: 8, padding: "16px 20px", marginBottom: 24, borderLeft: "4px solid #3B6B8A" }}><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#212529", lineHeight: 1.7, margin: 0 }}><strong>Responsable del sitio:</strong> Santiago Adrian Ippolito — CUIT 20-32584955-0 — Calle 49 N° 1295, La Plata, Buenos Aires, Argentina — gestorlaplata.ok@gmail.com / contacto@gestorlaplata.com</p></div>
        <S t="1. Responsable del tratamiento">
          <p style={{ margin: "0 0 8px" }}><strong>Gestor La Plata</strong> (en adelante, "el Estudio"), con domicilio operativo en la ciudad de La Plata, Provincia de Buenos Aires, República Argentina, es el responsable del tratamiento de los datos personales recolectados a través de este sitio web y sus canales de comunicación.</p>
          <p style={{ margin: 0 }}>Contacto: <strong>contacto@gestorlaplata.com</strong> · WhatsApp: <strong>221-488-6197</strong></p>
        </S>
        <S t="2. Datos que recopilamos">
          <p style={{ margin: "0 0 8px" }}>Recopilamos únicamente la información que vos nos proporcionás de forma voluntaria al contactarnos por WhatsApp, e-mail o formularios de consulta:</p>
          <p style={{ margin: "0 0 4px" }}>· Nombre y apellido</p>
          <p style={{ margin: "0 0 4px" }}>· Número de teléfono y/o dirección de correo electrónico</p>
          <p style={{ margin: "0 0 4px" }}>· Datos vinculados al trámite solicitado (partidas, matrículas, CUIT, direcciones de inmuebles, etc.)</p>
          <p style={{ margin: 0 }}>· Documentación que nos envíes para gestionar tu trámite</p>
        </S>
        <S t="3. Finalidad del tratamiento">
          <p style={{ margin: "0 0 4px" }}>Usamos tus datos exclusivamente para:</p>
          <p style={{ margin: "0 0 4px" }}>· Responder tus consultas y brindarte presupuestos</p>
          <p style={{ margin: "0 0 4px" }}>· Gestionar los trámites que nos encomendás ante organismos públicos</p>
          <p style={{ margin: "0 0 4px" }}>· Mantenerte informado sobre el estado de tus gestiones</p>
          <p style={{ margin: 0 }}>· Enviarte comunicaciones relevantes vinculadas a tu trámite (vencimientos, novedades normativas)</p>
        </S>
        <S t="4. Cookies y tecnologías similares">
          <p style={{ margin: "0 0 8px" }}>Este sitio web utiliza cookies propias y de terceros para:</p>
          <p style={{ margin: "0 0 4px" }}>· <strong>Cookies técnicas:</strong> necesarias para el correcto funcionamiento del sitio (sesión, preferencias de navegación).</p>
          <p style={{ margin: "0 0 4px" }}>· <strong>Cookies analíticas:</strong> recopilan información anónima sobre cómo usás el sitio para mejorar nuestro servicio (Google Analytics u otras herramientas de medición).</p>
          <p style={{ margin: 0 }}>Podés aceptar o rechazar las cookies desde el banner que aparece al ingresar al sitio. También podés configurar tu navegador para bloquear o eliminar cookies en cualquier momento.</p>
        </S>
        <S t="5. Compartición de datos">
          <p style={{ margin: "0 0 8px" }}>Tus datos personales no se venden, alquilan ni ceden a terceros con fines comerciales. Solo compartimos información cuando es estrictamente necesario para:</p>
          <p style={{ margin: "0 0 4px" }}>· Presentar documentación ante organismos públicos en tu nombre (RPBA, ARBA, Registro de las Personas, Municipalidad de La Plata, entre otros)</p>
          <p style={{ margin: 0 }}>· Cumplir con obligaciones legales o requerimientos judiciales</p>
        </S>
        <S t="6. Conservación de datos">
          <p style={{ margin: 0 }}>Conservamos tus datos durante el tiempo necesario para cumplir con la finalidad para la cual fueron recolectados y, posteriormente, durante los plazos de prescripción legal aplicables. Una vez cumplido el plazo, los datos se eliminan o anonimizan.</p>
        </S>
        <S t="7. Tus derechos">
          <p style={{ margin: "0 0 8px" }}>En virtud de la Ley 25.326 de Protección de Datos Personales de la República Argentina, tenés derecho a:</p>
          <p style={{ margin: "0 0 4px" }}>· <strong>Acceso:</strong> conocer qué datos tenemos sobre vos</p>
          <p style={{ margin: "0 0 4px" }}>· <strong>Rectificación:</strong> solicitar la corrección de datos inexactos</p>
          <p style={{ margin: "0 0 4px" }}>· <strong>Supresión:</strong> pedir la eliminación de tus datos cuando ya no sean necesarios</p>
          <p style={{ margin: "0 0 8px" }}>· <strong>Oposición:</strong> oponerte al tratamiento de tus datos en determinadas circunstancias</p>
          <p style={{ margin: 0 }}>Para ejercer estos derechos, escribinos a <strong>contacto@gestorlaplata.com</strong> o por WhatsApp al <strong>221-488-6197</strong>.</p>
        </S>
        <S t="8. Seguridad">
          <p style={{ margin: 0 }}>Implementamos medidas técnicas y organizativas razonables para proteger tus datos personales contra el acceso no autorizado, la pérdida, destrucción o alteración. Sin embargo, ningún sistema de transmisión o almacenamiento digital es 100% seguro.</p>
        </S>
        <S t="9. Modificaciones a esta política">
          <p style={{ margin: 0 }}>Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Cualquier cambio será publicado en esta misma página con la fecha de última actualización. Te recomendamos revisarla periódicamente.</p>
        </S>
        <S t="10. Contacto">
          <p style={{ margin: 0 }}>Si tenés dudas o consultas sobre esta Política de Privacidad, podés comunicarte con nosotros a través de <strong>contacto@gestorlaplata.com</strong> o por WhatsApp al <strong>221-488-6197</strong>.</p>
        </S>
      </Card>
      <div style={{ textAlign: "center", marginTop: 24 }}><Btn sm onClick={() => nav("home")} v="outline"><ChevronLeft size={14} /> Volver al inicio</Btn></div>
    </div></section>
  </div>;
}

// ─── COOKIES POLICY ─────────────────────────────────────────────────────────

function CookiesPolicyPage({ nav }) {
  useEffect(() => { document.title = "Política de Cookies | Gestor La Plata"; }, []);
  const S = ({ t, children }) => <div style={{ marginBottom: 28 }}><h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 18, color: "#1D3557", margin: "0 0 10px" }}>{t}</h3><div style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "#212529", lineHeight: 1.7 }}>{children}</div></div>;
  return <div>
    <section style={{ background: "linear-gradient(135deg, #1D3557, #264673)", padding: "130px 24px 70px" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}><button onClick={() => nav("home")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontFamily: "'Inter',sans-serif", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, marginBottom: 20, padding: 0 }}><ChevronLeft size={16} /> Inicio</button><h1 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "clamp(28px,4vw,44px)", color: "#F1F3F5", margin: "8px 0 12px" }}>Política de Cookies</h1><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: "rgba(241,243,245,0.75)", maxWidth: 640 }}>Última actualización: Abril 2026</p></div></section>
    <section style={{ padding: "60px 24px", background: "#F1F3F5" }}><div style={{ maxWidth: 800, margin: "0 auto" }}>
      <Card hover={false} style={{ marginBottom: 24 }}>
        <S t="1. ¿Qué son las cookies?">
          <p style={{ margin: 0 }}>Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo (computadora, celular o tablet) cuando los visitás. Sirven para que el sitio recuerde información sobre tu visita, como tus preferencias de navegación, lo que hace que tu experiencia sea más eficiente y personalizada.</p>
        </S>
        <S t="2. ¿Qué tipos de cookies usamos?">
          <p style={{ margin: "0 0 12px" }}>En <strong>gestorlaplata.com</strong> utilizamos los siguientes tipos de cookies:</p>
          <div style={{ background: "#F8F9FA", borderRadius: 10, padding: 20, marginBottom: 12, border: "1px solid #E9ECEF" }}>
            <p style={{ margin: "0 0 4px" }}><strong style={{ color: "#1D3557" }}>Cookies técnicas (necesarias)</strong></p>
            <p style={{ margin: "0 0 4px", fontSize: 14, color: "#3B6B8A" }}>Son imprescindibles para que el sitio funcione correctamente.</p>
            <p style={{ margin: "0 0 4px" }}>· Recordar tu elección sobre el banner de cookies</p>
            <p style={{ margin: "0 0 4px" }}>· Mantener la sesión de navegación activa</p>
            <p style={{ margin: 0 }}>· Garantizar la seguridad del sitio</p>
          </div>
          <div style={{ background: "#F8F9FA", borderRadius: 10, padding: 20, marginBottom: 12, border: "1px solid #E9ECEF" }}>
            <p style={{ margin: "0 0 4px" }}><strong style={{ color: "#1D3557" }}>Cookies analíticas</strong></p>
            <p style={{ margin: "0 0 4px", fontSize: 14, color: "#3B6B8A" }}>Nos ayudan a entender cómo interactúan los visitantes con el sitio.</p>
            <p style={{ margin: "0 0 4px" }}>· Páginas visitadas y tiempo de permanencia</p>
            <p style={{ margin: "0 0 4px" }}>· Origen del tráfico (buscador, redes sociales, directo)</p>
            <p style={{ margin: 0 }}>· Dispositivo y navegador utilizado</p>
          </div>
          <div style={{ background: "#F8F9FA", borderRadius: 10, padding: 20, border: "1px solid #E9ECEF" }}>
            <p style={{ margin: "0 0 4px" }}><strong style={{ color: "#1D3557" }}>Cookies de terceros</strong></p>
            <p style={{ margin: "0 0 4px", fontSize: 14, color: "#3B6B8A" }}>Provienen de servicios externos integrados en nuestro sitio.</p>
            <p style={{ margin: "0 0 4px" }}>· <strong>Google Analytics:</strong> medición de tráfico y comportamiento de navegación (datos anonimizados)</p>
            <p style={{ margin: 0 }}>· <strong>WhatsApp:</strong> botón de contacto directo</p>
          </div>
        </S>
        <S t="3. ¿Para qué usamos las cookies?">
          <p style={{ margin: "0 0 4px" }}>· Garantizar el funcionamiento técnico del sitio web</p>
          <p style={{ margin: "0 0 4px" }}>· Analizar de forma anónima el uso del sitio para mejorar nuestro servicio</p>
          <p style={{ margin: "0 0 4px" }}>· Recordar tus preferencias de navegación</p>
          <p style={{ margin: 0 }}>· Medir la efectividad de nuestras comunicaciones</p>
        </S>
        <S t="4. Duración de las cookies">
          <p style={{ margin: "0 0 4px" }}>· <strong>Cookies de sesión:</strong> se eliminan automáticamente al cerrar el navegador.</p>
          <p style={{ margin: 0 }}>· <strong>Cookies persistentes:</strong> permanecen en tu dispositivo durante un período determinado (generalmente entre 30 días y 2 años) o hasta que las elimines manualmente.</p>
        </S>
        <S t="5. ¿Cómo gestionar las cookies?">
          <p style={{ margin: "0 0 8px" }}>Podés controlar y gestionar las cookies de varias formas:</p>
          <p style={{ margin: "0 0 4px" }}>· <strong>Desde nuestro banner:</strong> al ingresar al sitio podés aceptar o rechazar las cookies no esenciales.</p>
          <p style={{ margin: "0 0 8px" }}>· <strong>Desde tu navegador:</strong> todos los navegadores permiten configurar, bloquear o eliminar cookies desde su panel de ajustes.</p>
          <p style={{ margin: "0 0 4px", fontSize: 14, color: "#3B6B8A" }}>Configuración por navegador:</p>
          <p style={{ margin: "0 0 4px" }}>· <strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</p>
          <p style={{ margin: "0 0 4px" }}>· <strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies</p>
          <p style={{ margin: "0 0 4px" }}>· <strong>Safari:</strong> Preferencias → Privacidad → Cookies</p>
          <p style={{ margin: "0 0 8px" }}>· <strong>Edge:</strong> Configuración → Privacidad → Cookies</p>
          <p style={{ margin: 0, fontSize: 14, color: "#3B6B8A" }}>Tené en cuenta que bloquear todas las cookies puede afectar el funcionamiento de algunos elementos del sitio.</p>
        </S>
        <S t="6. Base legal">
          <p style={{ margin: 0 }}>El tratamiento de datos a través de cookies se realiza conforme a la Ley 25.326 de Protección de Datos Personales de la República Argentina y la normativa complementaria aplicable. Las cookies técnicas se procesan por interés legítimo; las cookies analíticas y de terceros se procesan con tu consentimiento previo.</p>
        </S>
        <S t="7. Actualizaciones">
          <p style={{ margin: 0 }}>Esta Política de Cookies puede actualizarse periódicamente. Cualquier cambio será publicado en esta misma página con la fecha de última actualización.</p>
        </S>
        <S t="8. Contacto">
          <p style={{ margin: 0 }}>Si tenés consultas sobre nuestra Política de Cookies, escribinos a <strong>contacto@gestorlaplata.com</strong> o por WhatsApp al <strong>221-488-6197</strong>.</p>
        </S>
      </Card>
      <div style={{ textAlign: "center", marginTop: 24 }}><Btn sm onClick={() => nav("home")} v="outline"><ChevronLeft size={14} /> Volver al inicio</Btn></div>
    </div></section>
  </div>;
}

// ─── SEO ROUTING ────────────────────────────────────────────────────────────

const SLUGS = {
  // Bloques de servicio
  registrales: "servicios-registrales",
  arba: "arba-y-catastro",
  actas: "actas-e-inscripciones",
  habilitaciones: "habilitaciones-comerciales",
  permisos: "permisos-y-publicidad",
  // Subs (solo las que tienen más de 1 landing)
  informes: "informes-registrales",
  // Landings individuales
  dominio: "informe-de-dominio",
  titularidad: "indice-de-titularidad",
  anotaciones: "anotaciones-personales",
  frecuencia: "informe-de-frecuencia",
  "copias-reg": "copia-de-asiento",
  "estudio-titulo": "estudio-de-titulo",
  "plancheta-l": "antecedentes-catastrales",
  "plano-l": "copia-de-plano",
  "valuacion-l": "valuacion-fiscal",
  "agrimensores-l": "servicio-agrimensores",
  "actas-l": "actas-registro-civil",
  "divorcio-l": "inscripcion-divorcio",
  "apostilla-l": "apostilla-de-la-haya",
  "alta-l": "alta-comercial",
  "transferencia-l": "transferencia-comercial",
  "baja-l": "baja-comercial",
  "eventos-l": "eventos-la-plata",
  "publicidad-l": "publicidad-la-plata",
  "reba-l": "reba-la-plata",
  // Páginas estáticas
  about: "quienes-somos",
  privacy: "politica-de-privacidad",
  cookies: "politica-de-cookies",
};

const SLUG_REVERSE = Object.fromEntries(Object.entries(SLUGS).map(([k, v]) => [v, k]));

function stateToPath(r) {
  if (r.p === "home") return "/";
  if (r.p === "about") return "/" + SLUGS.about;
  if (r.p === "privacy") return "/" + SLUGS.privacy;
  if (r.p === "cookies") return "/" + SLUGS.cookies;
  if (r.p === "landing" && r.l) return "/" + (SLUGS[r.l] || r.l);
  if (r.p === "sub" && r.s) return "/" + (SLUGS[r.s] || r.s);
  if (r.p === "block" && r.b) return "/" + (SLUGS[r.b] || r.b);
  return "/";
}

function pathToState(path) {
  const slug = path.replace(/^\//, "").replace(/\/$/, "") || "";
  if (!slug) return { p: "home" };
  const key = SLUG_REVERSE[slug];
  if (!key) return { p: "home" };
  // Static pages
  if (key === "about") return { p: "about" };
  if (key === "privacy") return { p: "privacy" };
  if (key === "cookies") return { p: "cookies" };
  // Block (service category)?
  const blk = SERVICES.find(s => s.id === key);
  if (blk) return { p: "block", b: key };
  // Sub?
  for (const svc of SERVICES) {
    const sub = svc.subs.find(s => s.id === key);
    if (sub) {
      if (sub.landings.length === 1) return { p: "landing", b: svc.id, s: sub.id, l: sub.landings[0].id };
      return { p: "sub", b: svc.id, s: sub.id };
    }
    // Landing?
    for (const sb of svc.subs) {
      const ln = sb.landings.find(l => l.id === key);
      if (ln) return { p: "landing", b: svc.id, s: sb.id, l: ln.id };
    }
  }
  return { p: "home" };
}

function getMetaDescription(r, cs, csub, cl) {
  if (r.p === "landing" && cl) return cl.intro.substring(0, 155) + "...";
  if (r.p === "block" && cs) return `${cs.title} en La Plata y PBA. ${cs.desc}. Gestoría profesional con seguimiento digital.`;
  if (r.p === "sub" && csub) return `${csub.title}: ${csub.desc}. Gestión profesional en La Plata y Provincia de Buenos Aires.`;
  if (r.p === "about") return "Gestor La Plata: especialistas en gestión registral y municipal. Equipo profesional dedicado a destrabar trámites en La Plata y PBA.";
  if (r.p === "privacy") return "Política de Privacidad de Gestor La Plata. Conocé cómo protegemos tus datos personales.";
  if (r.p === "cookies") return "Política de Cookies de Gestor La Plata. Información sobre el uso de cookies en nuestro sitio web.";
  return "Gestoría profesional en La Plata y Provincia de Buenos Aires. Trámites registrales, habilitaciones comerciales, ARBA, actas y más. Respuesta inmediata por WhatsApp.";
}

function getCanonical(path) {
  return "https://gestorlaplata.com" + (path === "/" ? "" : path);
}

// ─── LAZY MAP (IntersectionObserver) ─────────────────────────────────────────

function LazyMap() {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || show) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { setShow(true); io.disconnect(); }
    }, { rootMargin: "200px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [show]);
  return <div ref={ref} style={{ marginTop: 8, borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", minHeight: 180, background: "rgba(0,0,0,0.2)" }}>
    {show && <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.4058116853685!2d-57.96294992351826!3d-34.921358074344006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e7942055fd0b%3A0x219240e0a0a87203!2sGestor%20La%20Plata!5e0!3m2!1sen!2sar!4v1775383870483!5m2!1sen!2sar" width="100%" height="180" style={{ border: 0, display: "block" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Ubicación Gestor La Plata" />}
  </div>;
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [r, sr] = useState(() => pathToState(window.location.pathname));
  const [mo, smo] = useState(false);

  const nav = (p, b, s, l) => {
    const newR = { p, b, s, l };
    sr(newR);
    smo(false);
    const newPath = stateToPath(newR);
    window.history.pushState(newR, "", newPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onPop = (e) => {
      const st = e.state || pathToState(window.location.pathname);
      sr(st);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("popstate", onPop);
    // Replace initial state
    window.history.replaceState(r, "", stateToPath(r));
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const cs = SERVICES.find(s => s.id === r.b);
  const csub = cs?.subs.find(s => s.id === r.s);
  const cl = csub?.landings.find(l => l.id === r.l);

  // SEO: update meta tags
  useEffect(() => {
    const desc = getMetaDescription(r, cs, csub, cl);
    const canonical = getCanonical(stateToPath(r));
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) { metaDesc = document.createElement("meta"); metaDesc.name = "description"; document.head.appendChild(metaDesc); }
    metaDesc.content = desc;
    let metaOgDesc = document.querySelector('meta[property="og:description"]');
    if (!metaOgDesc) { metaOgDesc = document.createElement("meta"); metaOgDesc.setAttribute("property", "og:description"); document.head.appendChild(metaOgDesc); }
    metaOgDesc.content = desc;
    let metaOgUrl = document.querySelector('meta[property="og:url"]');
    if (!metaOgUrl) { metaOgUrl = document.createElement("meta"); metaOgUrl.setAttribute("property", "og:url"); document.head.appendChild(metaOgUrl); }
    metaOgUrl.content = canonical;
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = canonical;
    let metaOgTitle = document.querySelector('meta[property="og:title"]');
    if (!metaOgTitle) { metaOgTitle = document.createElement("meta"); metaOgTitle.setAttribute("property", "og:title"); document.head.appendChild(metaOgTitle); }
    metaOgTitle.content = document.title;
    let metaOgType = document.querySelector('meta[property="og:type"]');
    if (!metaOgType) { metaOgType = document.createElement("meta"); metaOgType.setAttribute("property", "og:type"); document.head.appendChild(metaOgType); }
    metaOgType.content = "website";
    let metaOgSite = document.querySelector('meta[property="og:site_name"]');
    if (!metaOgSite) { metaOgSite = document.createElement("meta"); metaOgSite.setAttribute("property", "og:site_name"); document.head.appendChild(metaOgSite); }
    metaOgSite.content = "Gestor La Plata";

    // Schema.org JSON-LD LocalBusiness
    let schemaScript = document.querySelector('script[data-schema="local-business"]');
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.type = "application/ld+json";
      schemaScript.setAttribute("data-schema", "local-business");
      schemaScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Gestor La Plata",
        "description": "Gestoría profesional en La Plata y Provincia de Buenos Aires. Trámites registrales, habilitaciones comerciales, ARBA, actas y más.",
        "url": "https://gestorlaplata.com",
        "telephone": "+5492214886197",
        "email": "contacto@gestorlaplata.com",
        "address": { "@type": "PostalAddress", "streetAddress": "Calle 49 N° 1295", "addressLocality": "La Plata", "addressRegion": "Buenos Aires", "addressCountry": "AR" },
        "geo": { "@type": "GeoCoordinates", "latitude": -34.921358, "longitude": -57.962950 },
        "image": "https://gestorlaplata.com/logo.png",
        "priceRange": "$$",
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "299", "bestRating": "5" },
        "sameAs": ["https://instagram.com/gestorlaplata"],
        "areaServed": { "@type": "State", "name": "Buenos Aires" },
        "serviceType": ["Gestoría", "Habilitaciones Comerciales", "Informes Registrales", "Trámites ARBA", "Actas de Registro Civil"]
      });
      document.head.appendChild(schemaScript);
    }

    // Preconnect for Google Fonts
    if (!document.querySelector('link[href="https://fonts.googleapis.com"][rel="preconnect"]')) {
      const pc1 = document.createElement("link"); pc1.rel = "preconnect"; pc1.href = "https://fonts.googleapis.com"; document.head.appendChild(pc1);
      const pc2 = document.createElement("link"); pc2.rel = "preconnect"; pc2.href = "https://fonts.gstatic.com"; pc2.crossOrigin = "anonymous"; document.head.appendChild(pc2);
    }

    // Favicon
    if (!document.querySelector('link[rel="icon"]')) {
      const fav = document.createElement("link"); fav.rel = "icon"; fav.type = "image/png"; fav.href = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAHqUlEQVR4nKWXe3AV1R3HP+fs3pvXDeRFCESEQGIwERINYEYBw6MCoVIsjFIeGSgPGR6VhxKBIhQnCCiCAxZCawGl0vpoBcoInWmRKtBWCsWhMvIuYyBBcvO4yU1y7+6e/rEbktzkpnX6+2d3zzl7vt/f7/zO7yEARTgRApRqeY9JgtjuEB0P7hjQXPacGUQE6sFfhfJVQP3dtv+pTiDCE3CmdDck9oPEPhDVFaTubKjagiDsp2VAQw1U3oDKq2AEOoXpYKZlSCSlo3oOgMhYe2PLtEFF67W0bKEcMlKziTbWIm5dQN29EhYuZMT51FzQJ9/W2jRs8GYt/ydxrCN10HRE5Q3Ujb+CGWwH2erLeXVFITIKUJ4kCDZ+R+AwRFyRUHcXLn8KwYY2sLLNYs2NyBiBikl0wOX/Ae4oJaS9V0wiImMEaG5aW8AmIGwQkZaP8iSC0eSAtxdNyublaNJeI4VAyk6ICglGE8qTiEjLpzWmbL4molsGKqFPK83bi9QkZp0fZSmEEJi+ejRdwwoEsfxNSK3j/+6RCDaiEvogumU4ziyQKAV6JCp1IJiB8JprGla1j4JhDxMZ4UYFg3xv5BDMCi9pfXqSOzADq8qHrmudkzADqJ4DQY8ApdABRLd0lDumldO1FZdLJ1heyZQpY9j98nze+cMJauv8zJxQwIZe3SkcPohB2X0ZO289Z899jZ7QFcMwOiZhWRARY1v89gUkUrNNbxkd+psNfpfp0wrZuGQ6fUbPZcITg1gybTyj5/6M7SvncOtbL49PXcmR0jU8kpuJUVmN1MJYQgCWYWNKDYknuSXQhDC4p/mzY9i0dDrZ319EydIZHP/iAhv3fMzp/RuYsWYHGb17kJ+byaiin3KkdA2D8h5E+RvDHIcTLSNjwZOMFF1S7MgVEg81XSNY4WXypFFsLf4x/cctoGTpDPqnpTJr1XYGZ6dz8VoZj/RPY/Ssl1m36EdkpffiyTnr2F2yGN2lYdTUoXVkCQVIDdElBamiE0BZbZSXmsSs8jF+/FC2r55LVuFC1ix4lrzsfoyYvoozH7zO2YvXyB+3gKy0VPa9+hOGTlnBtlVzyM/JpPCZF5k0fhjjRudjeqvRQi0hAGWhohOQuKOdpOLcSylQ/kYGDEjngy0v8OiUYpbNmsjQvCyGTSnmzO+3cvTkOdZueBuS4hg7aTk3K7zEJcVx3+h55A1Ip7wxwN//cZEty4sYmJOJ6a0NuaJOhnRHI8j5oUJ338tsmiYxq3384KkC3itZxOnzl6hrbKKoeBsHd6zkL2cvsnbTHvSuHrolJzBxeB7VdX7iu3oIBII0BQzi4zxUV3gZO3IIIwZnUzBzDZf+fRvhdmG1zqBGwL6GHTmKaZo0BYIUDMrmtXcO0dDYxMAHevP6u4fvkfVERvBozgN4a+qIcOlER0VQWe0jLjYGI7U7UZFuUhLjSO4Wz9dXv0FGtCjaLLrt/RG0SamapMZXT3wXD72fnM/eDYvZuKyI3qPmcvWPpTyH4OPDJ7iiacycsZpx0wq58k0Fl09/SdFzk3n38AncSnH6wCamrnyTzz49g5YUj2ma7W6DJOB3go9NwLQspCeaz07+k7U732f/pucZWbSaYXlZvDR3Eg8WLmTXuvlMnFCAunGL9RufZ8vyIry373L0d28wenA2wlvD1KdH8dGf/saBA0fRu4WC22GYgB9d+KtQXVKcYsKethwS6zfvIb5kMZ+/t4khk5Zx9uCbBIIGuU8v5dDPVzM8N5Pch9LJKlzI+9uKuV52hyUbf8XR32xm8gtbqL3jRUuOxzBagzu6ConwVyGIS1WkP9FhINI1iVHhZcdrS8nuex8jpq/kyyNvUfrbYyAFO16azbDZa5k65jFiY6KYWbyNS8d2sWXfIXb9+giaJ5pgKHgzA6nDlRMINJcia5xdZCor1BfRhcT41svuN16kd48kxsxey+3P9+LSNJ5a+Cqn9m/gk5PnKJy3nkvHdrJ132F2ln6I7J6IZVkdgNva01QPFz+xQ4JIzUGl5nSYjIQQaEJgVFazc/MSHs/J5GZ5JQCeqAgqqmqJjY6kf1oqW/Ye4q3SD3GlJBEMl4yaK6Sy81B23qmN3NGQPR6ERruY7JCQgOmrp2TFLN4+eJyyO15eWfAMK0p+ydChD/NQv17s+sVH6MkJ7c881KzKhH8dgYAfgRAKpSAlC+4fZNdsHdUEAiQCq8YH0VGgSaitR8bHYjU0QcBAi/NgmmHMDvYRu6IQN79AlV8EIRwLNJs9YyR07QlG+KpI0ySWZfcFmpQYpoWUAoHADHfmzeB6JKLmFuryn50x5dSEyv7g+ilorLELx1CHdMQ0LZSyjWY42lqW+u/gmhvRWIO6fsrGck7aUdMJAsEGuHQcmnygR4Yl8Z3E0ZwmH+rS8XZleUiX4GQpVxSi72Oorql2a6XMsEfSKbDQQHcjaspQ1045/tW2V+ykNROIHlmolCxwRdldjTJbRczQ+k21zAnN7q6CDXD7Kyj/ipbJTluzDobdMYjkDFT8/RDhsS2hrJYGtXm9EC1zTXWIqpuoO5chUN8pVCfdMW3Npbns1rxLCkTFgzsKpMv+3TIg0IDwV6F85eCrcPpA2pk8VP4DPEQpV8nHX2QAAAAASUVORK5CYII="; document.head.appendChild(fav);
    }
  }, [r, cs, csub, cl]);

  return <div style={{ fontFamily: "'Inter',sans-serif", background: "#F1F3F5", minHeight: "100vh", color: "#212529", overflowX: "hidden", maxWidth: "100vw" }}>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
    <div className="topbar" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: "#0B1B2E", height: 32, display: "flex", alignItems: "center" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 32, fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(241,243,245,0.65)", width: "100%" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Star size={12} fill="#F4A261" color="#F4A261" /> 5.0 Google · +312 reseñas verificadas</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Clock size={12} /> Respondemos en minutos por WhatsApp</span>
      </div>
    </div>
    <nav className="mainnav" style={{ position: "fixed", top: 32, left: 0, right: 0, zIndex: 999, background: "rgba(19,36,55,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div onClick={() => nav("home")} role="button" aria-label="Ir al inicio - Gestor La Plata" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10, marginRight: 32, flexShrink: 0 }}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAkCAYAAAAdFbNSAAAM8UlEQVR42r2ZeXhU13nG33PuzJ2RRqMNY4yL61InTZsY7BhSx8tjxbEdNw52SWFwbUOw01aynToOWpAQSFdCRizCCxJoGSMBQmyDWYJwYxun2HHqkD6kVQspFC8KtkHWNvvcufvXP+ZeCRwlDxCn95l/5s6cc373m/f7vvecAS7nKu5wA4BQtnE+r93+DgJSDgBIR4+6AOD48eNuRVF2JxLhmQBARC5IkgsAWNXLzWzZy90AYN9j+KNfUgZM+NGGb6F2exSN+4hVdx2Z2dTt4wCkUEhU1fR+IiJd1/43EhmYDgACAF7RXomVuwgNe4hVBlf/oeDskoHr7zaE8uZ7LV/hIRJcWVBSJsu/ShBGB39aYGoLP2n8p1bRLX4XsABwaLrebw4NFWU3vjJf+LPpL5ixsMlAIH+BwMJDjbSuZLk9rwmALgeaXyqwq+zFu6ys/P3k82exVHyPx9Tu5fFIzBB993R9/4H/FN3idy1YkXgqPUfR1LdFt3t6PDfv36dOm7LeTCTNHEtdwFU1wBSZKH9SNavsqEP93Qako8IfRRKu0k23s5ruCNYeJLZs86EiaYuXA8DChtt7TvTLRGREFVU9ffr9ezJaHsz5OBx5j4jov0bi5qzGbaVjUilrWczqdlhYtZf40o7lF67z+QGXbbyV1XSPYu2PiS3rPPxlSRKJiAFgRGY7EVHEsOjrL79O+OdNe2nDBg9KN34/t2FX4ufnRsm+fv7Lk/3XAMQ4AF7R+o+sfhfhuRDx8taqywWfWB6SZEti09fM7NxXKSevkMVGXrshmZz367o6gzFGmiIHAV4CWImXjvyy/tip31ji9dPm88GcfxN8OcE4E3MWd73aAFjvArjjli9d2/vJJ6cKLUgcTU9vZonI08wyYeVftZovDZbaUrnCiNslyl22YRar6R7C2h8Tq+58fdqSJVlExAFAVZVWIiLD0NNDo6MPAACebf42qrdGUdNNqN9pics3VwNAf3//Nbqu9RERqapyrL+/Px+SxDkAXt76A6zcTWjYQ7yy41kAQCgkXBlw6Yavspqtgzbwm1OLpWwHWFHkZiIi0zSUZDI5xxlKREW9pz6K5DeGiNXtJKGqY42z+tDQ0FRd105kHlR958yZM7mQyAZvfwYNDnj7DzIcxC8PeEnzTaxm66c28E+nLGzyjUc4/XxmYUNLpeJznaHpdPJbqq4rRETPv/WrgyjtiLrWHya2NPiCAz4yMvInpqmfzNRx9e3BwcEcBEICB8CXtv8IDbsJaw4Qrwg+BgDSyZPiJQK3zGA1285ngLvemvy0lOMAp9OpdXaE9UQiGnCGJhLRew3DSBIRxZLJNheA7KrgHFa7XcXq/cSWdqxzwEdHR68zDO00EZGmqUcHBvp8CI2BS0zqOSmWtvwFMokOO+F/n4ZfupGt2HYuUyU2v1P4mJR7QYRX2cCGLCcedoZGIpG7DUNPEBEpitwBALM6jrsZAKG0eS5qe2zwtlUO+MDAwHTD0N6zwd842t/vlWypTJ1TnO3MnYrH/84BnxBefHbTX7Gabeex7hCx6q53Cp+Rcp0v6rpabwObsiw/4oyR5fidpmlEbeDN9gICEbGxlr+kZR5qe3Q07iO2tL1eGJNT9M8NQ//ABu+V7MA5pTSdTj2fSdz0OsfDXATuXtIyg63Y+hHWHCBW3fVuQfGaPOcLiiJLNrAly4mFGP+ZbzdNI2wDb7kI+LPmqqI1gLodOpp6iVUGm47a5mp4ePhLhqGftZPzzXA4nOfAyXLiYdM00kRE6XTqt8FZddcQngsRq+768PrFkpezzH1NU1Zk+oJpqar8PYdF01KzdV0bzURJ2W5PyD/7ExIRc6Tirmh/mNXv/BWv6zktVmyaS0QCAMTj8S/ruvozwzDOpFKJ+lAoJBCRGwBisfBDpmmoduKuugic1WwjrNimo25nUqzu/CEDEE3Ga5xWlkzG/+ECDd9iGPqQDbw70xV/G/j3XkXShA3EeRAnCACQSsUedCKu62qDA85YdadFXGBCdg7MaBQlf/2FV9vnFX0no1v5SZ/P1wEA4fCnM3NzJ70pCK7JipI+2Nt7eH4gECAAxBi7yKWFQiEhEAi4ent7BQA4NWQJU6/LsvJVlWbM8FsnTiQ4APj9fl5QUECDg4MQRdFMJBJj9fnaa691z549Ox6Nhh/x+3ODnAs+VU3Xeb3Z9YzVdhOZ5rBgaj8hMXuRh3H20kO3qsW33PAUY2wLEQmyLH/V4/H8RBCEq1RV2bNtW/ei4uJi87PAmSgwQ1XlBaKY9bxhaABgazHzyphQusgd24oEUea+MycRBEEQ4pzTNIC5AEHQNHWjy57JANEQOLNUzRAiadUCMDTuuXUOiE4UlJKSEr24uFj43T6Y5QCYJggCGPvDnKdlGZMAxgFmZB4IXsaWd1nEOBO8WTBTaSy6+bpj3Qu++XXLssxUKhXIzc09kJHH4E25uYVHBME1WdfVblH0LrZ1aI1HhhhjjIaHh/3pdHqKx0OkqozB44HH4yGPx0N5XliZRwfgBQO83H5jKYpCXi/w8cfDLpfL5Xa79Zgo5j6ak+NfxbkgGoa21u32VIEt30JYsdVg9TtV97LOdUTEk7L8om2I1GQyNmc8EYfGElFR5M4JS93neKXTiXtN04zYNfuFsX0nq+5UsHI3sequDylTDVgmCZMtdo2Wk8nk34x1qlR0tmkaw5mMVtomAre7GA+EToocgLeidZGrrueQa8XWN/zlLbc5lWJgYOBqRUl3K4pyJB6P1trzTFTyXrxwHc4N7UGmqwny+afz6s6Ds0tKXEQkZGfnPKOq6TbOhSyv17svkUjcBwA+X/7xZDL6oGkaEZfL86SiyJsYYyaAsdLHGCNWEhT2LrhRQ0XbY4ovr9vwFzxoWsZ/P37dDf/BGDOj0Wjh5MmFhz0e7yJB4F9USNv9VibBDFlOLPD5/CFbEs1ut2fJZ6UIoaztG6x2ewprDhJbtnl/UZHkcqKhKHKHLZVkIhG5x4lmODx4p67r0UzXkjdcVPztNs6Xtv49pB4Dq14hXtG+wsnks2fPFui6eszeuZ84f/785LH6TMRkOVll++9NE0vQabelLfex2u1JrDlAbFnnK4FAQHDANU3ZbFvSuCzH7xoHD99lGHrMbrfrASAQyljKsfZt+w6eWZ198MEHeaqqvGsDnxoZGZnm7B9RFMhx5o7FYg/YzWtiwzRmcEpb7s9E/ACxZZtDkiRxBzydTnXbGo/E4/E7xq1p4humacSJiKKJxFoGIKuyYx5zjFJVRwPPuEk+ODiYYxj62zbw6XPnzv3p2Ia3vO17bOWu91zl7bdJdKmbgLHTo+Zvs9rtcsZAde6yk5MDYJqm9NhSCcdio7ddkOXf1AxDJiKqfe0Xe1EWTAlNh4hVBhu5vRPp6+vzaZr6r/b4M+Fw+Prxw5y2R1C3Q8e6XuJL28qdTcClVaUxZ9b2AKvdnsaaA8SqNu+4EFzXtV32wqMjIyO3XlAx7th7sj+a52y3KjvqOIBAKCQcP348W1WVN+1x70cikfHTp7K2BajrMdC4j3hFW+2lbLcu/jBYokM66jKbnvoXnk4EmJxUKW/So7wq2C0wZhERe/TAwYWapuwXBFdhfn5e79nh4VkAwJ7dcE1g5894LK2CGEjg3CIAq26+2TVz5o37RdFzj2WZHyaTqfsLCgr6BQAo2zif/P4dELMEFhlpsJqeWolQSEA9sy7/WKy4w41giS5UtD5kZfn3UlaOyGJD3WxNyWKTiAeDQeGJJx4Pud3iXAAfz9v2Wtvh94ca4c+FHgv/gnHha5ST78oaPiel1j/9FQALDEP/SI5E78u7+uozAgCUt86zfHm7yON1s8jwKmp6csWVHpNNIJWOuWP7vapgJ7ebh7TlqJeI9hz7NEpTVu8lVG41Ud7eTaGQwMvbSoSanvi+0584Dvd/zg4MfMWRhFDaPDeTqPuJVbQ3XlAMPofO6oCXt85jUo9mg7/saOoaKTg/q3GPjiUdxhMH300R0U0AIHKGXw8M9RER/SYuW/dv3N88DtzyEJN6FKzeT6yife2VnKCySwLPSCVgZeXupGyfi4WHN7iZfsTw5u2zdNPznS9OGTj8+P1TYZkDsURyrugRK7K8WfPTujY6a2Ov71RM9/qMVJmS1k9Yfn8veX0eFh1eT2uLKzKnWfWXJQl2yREPlui8YuMj5CvYQYwxaAp43iTw0cGd0dK/LeP5eTuzRM/dpqmrguD2aIYeFl3uO9nitTNcf/mFPYaSBjN0g3ILXSwy+BKtLVlyJcBXJBVevmkharerWLWX2LLOHokkDgCv9/X5VFV5w25A55LJyC0A4Mo0jsch9Rh4bi+xquALFxx//T/8G+CAL+34IVu+5bVMySTm/H3R19fnUxTlDVmOF43ZSGdMZXs1q+7cMQ585Xb2/wAGR7VUltej0wAAAABJRU5ErkJggg==" alt="Gestor La Plata" width="45" height="28" style={{ height: 28, width: 45, objectFit: "contain" }} /><span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 15, color: "#F1F3F5", whiteSpace: "nowrap" }}>GESTOR <span style={{ color: "#F4A261", fontWeight: 700 }}>LA PLATA</span></span></div>
        <div className="dn" style={{ display: "flex", alignItems: "center", gap: 4 }}><NB o={() => nav("home")} a={r.p === "home"}>Inicio</NB>{SERVICES.map(s => <NB key={s.id} o={() => nav("block", s.id)} a={r.b === s.id}>{s.title.replace("Servicios ", "").replace("Comerciales", "")}</NB>)}<NB o={() => nav("about")} a={r.p === "about"}>Nosotros</NB><Btn sm href={wl("Hola!")} style={{ marginLeft: 8 }}><MessageCircle size={14} /> Contacto</Btn></div>
        <button onClick={() => smo(!mo)} className="mb" style={{ background: "none", border: "none", color: "#F1F3F5", cursor: "pointer" }}>{mo ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
      {mo && <div className="mm" style={{ background: "#1D3557", padding: "16px 24px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}><NB o={() => nav("home")} m>Inicio</NB>{SERVICES.map(s => <NB key={s.id} o={() => nav("block", s.id)} m>{s.title}</NB>)}<NB o={() => nav("about")} m>Nosotros</NB><div style={{ marginTop: 12 }}><Btn sm href={wl("Hola!")}><MessageCircle size={14} /> Contacto</Btn></div></div>}
    </nav>
    <main>
      {r.p === "home" && <HomePage nav={nav} />}
      {r.p === "about" && <AboutPage nav={nav} />}
      {r.p === "block" && cs && <BlockPage service={cs} nav={nav} />}
      {r.p === "sub" && cs && csub && <SubPage service={cs} sub={csub} nav={nav} />}
      {r.p === "landing" && cs && csub && cl && <EnhancedLanding service={cs} sub={csub} landing={cl} nav={nav} />}
      {r.p === "privacy" && <PrivacyPage nav={nav} />}
      {r.p === "cookies" && <CookiesPolicyPage nav={nav} />}
    </main>
    <footer style={{ background: "#132437", padding: "56px 24px 24px" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 40, marginBottom: 32 }}><div><h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 18, color: "#F1F3F5", margin: "0 0 12px" }}>GESTOR <span style={{ color: "#F4A261" }}>LA PLATA</span></h3><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(241,243,245,0.5)", lineHeight: 1.6, margin: "0 0 20px" }}>Tu tiempo vale. Dejá la burocracia en nuestras manos.</p><div style={{ display: "flex", flexDirection: "column", gap: 10 }}><div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "rgba(244,162,97,0.08)", borderRadius: 8, border: "1px solid rgba(244,162,97,0.25)" }}><Shield size={14} color="#F4A261" /><span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#F4A261", fontWeight: 600 }}>Santiago A. Ippolito · Mat. 10001</span></div><div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "rgba(255,255,255,0.04)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)" }}><Star size={14} fill="#F4A261" color="#F4A261" /><span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(241,243,245,0.7)" }}>5.0 / 5.0 · +312 reseñas verificadas en Google</span></div></div></div><div><h4 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 12, color: "#F4A261", margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "1px" }}>Servicios</h4>{SERVICES.map(s => <div key={s.id} onClick={() => nav("block", s.id)} className="footer-link" style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(241,243,245,0.55)", marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}>{s.title}</div>)}</div><div><h4 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 12, color: "#F4A261", margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "1px" }}>Contacto</h4><div style={{ display: "flex", flexDirection: "column", gap: 10 }}><div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(241,243,245,0.55)" }}><MapPin size={14} /> Calle 49 N° 1295, La Plata, Buenos Aires</div><a href="https://wa.me/5492214886197" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(241,243,245,0.55)", textDecoration: "none", transition: "color 0.2s" }}><MessageCircle size={14} /> 221-488-6197 (WhatsApp)</a><a href="mailto:contacto@gestorlaplata.com" className="footer-link" style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(241,243,245,0.55)", textDecoration: "none", cursor: "pointer", transition: "color 0.2s" }}><Mail size={14} /> contacto@gestorlaplata.com</a><a href="https://instagram.com/gestorlaplata" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(241,243,245,0.55)", textDecoration: "none", transition: "color 0.2s" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> @gestorlaplata</a><LazyMap /></div></div></div><div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}><p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(241,243,245,0.35)", margin: 0 }}>© 2026 Gestor La Plata · Santiago A. Ippolito · Matrícula 10001 · Todos los derechos reservados.</p><div style={{ display: "flex", gap: 16 }}><button onClick={() => nav("about")} style={{ background: "none", border: "none", fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(241,243,245,0.5)", cursor: "pointer", textDecoration: "underline", padding: 0 }}>Quiénes somos</button><button onClick={() => nav("privacy")} style={{ background: "none", border: "none", fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(241,243,245,0.5)", cursor: "pointer", textDecoration: "underline", padding: 0 }}>Privacidad</button><button onClick={() => nav("cookies")} style={{ background: "none", border: "none", fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(241,243,245,0.5)", cursor: "pointer", textDecoration: "underline", padding: 0 }}>Cookies</button></div></div></div></footer>
    <WAFloat />
    <CookieBanner onPrivacy={() => nav("cookies")} />
    <style>{`
  .dn{display:flex!important}
  .mb{display:none!important}
  .topbar{display:block}
  .footer-link:hover{color:#F4A261!important}
  .navbtn:hover{color:#F4A261!important}
  @media(max-width:1023px){.dn{display:none!important}.mb{display:flex!important}.topbar{display:none!important}.mainnav{top:0!important}}
  @media(min-width:1024px){.mm{display:none!important}}
  *{box-sizing:border-box}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
  @keyframes cookieSlide{from{transform:translateY(100%)}to{transform:translateY(0)}}
  @media(max-width:900px){
    section>div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important}
    section>div[style*="grid-template-columns: 1fr 380px"]{grid-template-columns:1fr!important}
    section>div[style*="minmax(350"]{grid-template-columns:1fr!important}
    section>div[style*="minmax(340"]{grid-template-columns:1fr!important}
    section>div[style*="minmax(300"]{grid-template-columns:1fr!important}
    section>div[style*="minmax(280"]{grid-template-columns:1fr!important}
    section>div[style*="minmax(260"]{grid-template-columns:1fr!important}
    section>div[style*="minmax(220"]{grid-template-columns:1fr!important}
    section>div[style*="minmax(200"]{grid-template-columns:1fr!important}
  }
`}</style>
  </div>;
}

function NB({ children, o, a, m }) { return <button onClick={o} className="navbtn" style={{ background: a ? "rgba(69,123,157,0.15)" : "none", border: "none", color: a ? "#F1F3F5" : "rgba(241,243,245,0.6)", fontFamily: "'Poppins',sans-serif", fontWeight: 500, fontSize: m ? 15 : 13, padding: m ? "10px 0" : "6px 12px", borderRadius: 4, cursor: "pointer", display: m ? "block" : "inline-flex", width: m ? "100%" : "auto", textAlign: m ? "left" : "center", whiteSpace: "nowrap", transition: "color 0.2s" }}>{children}</button>; }
