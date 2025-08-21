--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13 (Debian 15.13-1.pgdg120+1)
-- Dumped by pg_dump version 15.13 (Debian 15.13-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: enum_FlujoCajas_tipo; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_FlujoCajas_tipo" AS ENUM (
    'ingreso',
    'egreso'
);


ALTER TYPE public."enum_FlujoCajas_tipo" OWNER TO postgres;

--
-- Name: enum_alertas_tipo; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_alertas_tipo AS ENUM (
    'vencimiento',
    'stock_bajo'
);


ALTER TYPE public.enum_alertas_tipo OWNER TO postgres;

--
-- Name: enum_reportes_tipo; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_reportes_tipo AS ENUM (
    'diario',
    'semanal',
    'mensual',
    'promedio'
);


ALTER TYPE public.enum_reportes_tipo OWNER TO postgres;

--
-- Name: enum_transacciones_metodo_pago; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_transacciones_metodo_pago AS ENUM (
    'Tarjeta de crédito',
    'Tarjeta de débito',
    'Transferencia',
    'Efectivo'
);


ALTER TYPE public.enum_transacciones_metodo_pago OWNER TO postgres;

--
-- Name: enum_transacciones_tipo; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_transacciones_tipo AS ENUM (
    'venta',
    'compra'
);


ALTER TYPE public.enum_transacciones_tipo OWNER TO postgres;

--
-- Name: enum_users_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_users_role AS ENUM (
    'user',
    'admin'
);


ALTER TYPE public.enum_users_role OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: FlujoCajas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FlujoCajas" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    tipo public."enum_FlujoCajas_tipo" NOT NULL,
    monto double precision NOT NULL,
    descripcion character varying(255),
    fecha timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."FlujoCajas" OWNER TO postgres;

--
-- Name: Sales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Sales" (
    id uuid NOT NULL,
    "sellerProductId" uuid NOT NULL,
    cantidad integer NOT NULL,
    precio_total integer NOT NULL,
    comision_valor double precision NOT NULL,
    monto_vendedor double precision NOT NULL,
    fecha_venta timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public."Sales" OWNER TO postgres;

--
-- Name: SeedLogs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SeedLogs" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    tipo character varying(255) NOT NULL,
    resultado text NOT NULL,
    comentario text,
    "creadoEn" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "ejecutadoPor" character varying(255) DEFAULT 'sistema'::character varying NOT NULL
);


ALTER TABLE public."SeedLogs" OWNER TO postgres;

--
-- Name: SellerProducts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SellerProducts" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nombre character varying(255) NOT NULL,
    descripcion text,
    precio double precision NOT NULL,
    stock integer NOT NULL,
    "vendedorId" uuid NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."SellerProducts" OWNER TO postgres;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: alertas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alertas (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    tipo public.enum_alertas_tipo NOT NULL,
    mensaje character varying(255) NOT NULL,
    "productoId" uuid NOT NULL,
    leida boolean DEFAULT false,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.alertas OWNER TO postgres;

--
-- Name: categorias_producto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorias_producto (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nombre character varying(255) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    descripcion character varying
);


ALTER TABLE public.categorias_producto OWNER TO postgres;

--
-- Name: logactividad; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.logactividad (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "userId" uuid NOT NULL,
    tipo character varying(255) NOT NULL,
    descripcion text,
    ip character varying(255),
    fecha timestamp with time zone DEFAULT now() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.logactividad OWNER TO postgres;

--
-- Name: productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productos (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nombre character varying(255) NOT NULL,
    precio_unitario double precision NOT NULL,
    precio_total double precision NOT NULL,
    descuento_aplicable boolean DEFAULT false,
    stock integer DEFAULT 0 NOT NULL,
    "categoriaId" uuid NOT NULL,
    "userId" uuid,
    fecha_vencimiento timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    descripcion character varying(255),
    precio integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.productos OWNER TO postgres;

--
-- Name: reportes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reportes (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    tipo public.enum_reportes_tipo NOT NULL,
    fecha date NOT NULL,
    resumen jsonb,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.reportes OWNER TO postgres;

--
-- Name: seller_product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.seller_product (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "sellerId" uuid NOT NULL,
    "productId" uuid NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone DEFAULT now()
);


ALTER TABLE public.seller_product OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nombre character varying(100) NOT NULL,
    correo character varying(150) NOT NULL,
    password character varying(255) NOT NULL,
    role public.enum_users_role DEFAULT 'user'::public.enum_users_role NOT NULL,
    activo boolean DEFAULT true,
    "intentosFallidos" integer DEFAULT 0 NOT NULL,
    "bloqueadoHasta" timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: FlujoCajas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."FlujoCajas" (id, tipo, monto, descripcion, fecha, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Sales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Sales" (id, "sellerProductId", cantidad, precio_total, comision_valor, monto_vendedor, fecha_venta, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: SeedLogs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SeedLogs" (id, tipo, resultado, comentario, "creadoEn", "ejecutadoPor") FROM stdin;
\.


--
-- Data for Name: SellerProducts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SellerProducts" (id, nombre, descripcion, precio, stock, "vendedorId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20250101000000-enable-uuid-ossp.js
20250621191711-create-user.js
20250621212449-create-categoria-producto.js
20250621212454-create-producto.js
20250621212459-create-flujo-caja.js
20250624040308-create-reporte.js
20250624040312-create-alerta.js
20250629030000-create-seller-product.js
20250629041513-create-sale.js
20250629120000-create-seller-product.js
20250630212723-add-descripcion-to-categorias_producto.js
20250709022346-enable-uuid-ossp.js
20250709154526-add-descripcion-to-productos.js
20250709154840-add-precio-to-productos.js
20250711152104-create-logactividad.js
20250713183716-add-userId-to-productos.js
20250714170319-create-seedlog.js
20250714170639-create-seed-log.js
20250714173849-add-ejecutadoPor-to-seedlog.js
20250717200311-add-venta-to-enum-transacciones-tipo.js
20250717204635-add-venta-to-enum-tipo.js
20250717212131-add-compra-to-enum-tipo.js
20250723170000-create-transacciones.js
20250723173700-add-tipo-to-transacciones.js
20250723173800-fix-transacciones-tipo-enum.js
20250723194946-add-tipo-to-transacciones.js
20250723210530-add-monto-to-transacciones.js
20250723210811-add-descripcion-to-transacciones.js
20250724003119-make-productoId-nullable.js
\.


--
-- Data for Name: alertas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alertas (id, tipo, mensaje, "productoId", leida, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: categorias_producto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categorias_producto (id, nombre, "createdAt", "updatedAt", descripcion) FROM stdin;
\.


--
-- Data for Name: logactividad; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.logactividad (id, "userId", tipo, descripcion, ip, fecha, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productos (id, nombre, precio_unitario, precio_total, descuento_aplicable, stock, "categoriaId", "userId", fecha_vencimiento, "createdAt", "updatedAt", descripcion, precio) FROM stdin;
\.


--
-- Data for Name: reportes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reportes (id, tipo, fecha, resumen, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: seller_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.seller_product (id, "sellerId", "productId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, nombre, correo, password, role, activo, "intentosFallidos", "bloqueadoHasta", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: FlujoCajas FlujoCajas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FlujoCajas"
    ADD CONSTRAINT "FlujoCajas_pkey" PRIMARY KEY (id);


--
-- Name: Sales Sales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sales"
    ADD CONSTRAINT "Sales_pkey" PRIMARY KEY (id);


--
-- Name: SeedLogs SeedLogs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SeedLogs"
    ADD CONSTRAINT "SeedLogs_pkey" PRIMARY KEY (id);


--
-- Name: SellerProducts SellerProducts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SellerProducts"
    ADD CONSTRAINT "SellerProducts_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: alertas alertas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alertas
    ADD CONSTRAINT alertas_pkey PRIMARY KEY (id);


--
-- Name: categorias_producto categorias_producto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias_producto
    ADD CONSTRAINT categorias_producto_pkey PRIMARY KEY (id);


--
-- Name: logactividad logactividad_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logactividad
    ADD CONSTRAINT logactividad_pkey PRIMARY KEY (id);


--
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);


--
-- Name: reportes reportes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reportes
    ADD CONSTRAINT reportes_pkey PRIMARY KEY (id);


--
-- Name: seller_product seller_product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seller_product
    ADD CONSTRAINT seller_product_pkey PRIMARY KEY (id);


--
-- Name: users users_correo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_correo_key UNIQUE (correo);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: Sales Sales_sellerProductId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sales"
    ADD CONSTRAINT "Sales_sellerProductId_fkey" FOREIGN KEY ("sellerProductId") REFERENCES public."SellerProducts"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SellerProducts SellerProducts_vendedorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SellerProducts"
    ADD CONSTRAINT "SellerProducts_vendedorId_fkey" FOREIGN KEY ("vendedorId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: alertas alertas_productoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alertas
    ADD CONSTRAINT "alertas_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES public.productos(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: logactividad logactividad_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logactividad
    ADD CONSTRAINT "logactividad_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: productos productos_categoriaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT "productos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES public.categorias_producto(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: productos productos_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT "productos_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

