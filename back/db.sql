CREATE TABLE categoria (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR NOT NULL,
  descripcion VARCHAR,
  imagen VARCHAR
);

CREATE TABLE producto (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR NOT NULL,
  imagen VARCHAR,
  precio REAL NOT NULL,
  sabores TEXT,
  disponibilidad INTEGER NOT NULL DEFAULT 0,
  "categoriaId" INTEGER NOT NULL,
  FOREIGN KEY ("categoriaId") REFERENCES categoria(id)
);

CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR NOT NULL,
  email VARCHAR,
  "passwordHash" VARCHAR,
  "githubId" VARCHAR,
  rol VARCHAR NOT NULL DEFAULT 'cliente',
  "fechaRegistro" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pedido (
  id SERIAL PRIMARY KEY,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  total REAL NOT NULL,
  "usuarioId" INTEGER REFERENCES usuario(id)
);

CREATE TABLE detalle_pedido (
  id SERIAL PRIMARY KEY,
  "pedidoId" INTEGER NOT NULL,
  "productoId" INTEGER NOT NULL,
  cantidad INTEGER NOT NULL,
  "precioUnitario" REAL NOT NULL,
  FOREIGN KEY ("pedidoId") REFERENCES pedido(id),
  FOREIGN KEY ("productoId") REFERENCES producto(id)
);


INSERT INTO categoria (nombre, descripcion, imagen) VALUES
  ('Ácidas', 'Las que te hacen babear', 'https://preview.redd.it/three-cat-memes-for-your-collection-v0-tlormxy9l3ee1.jpg?width=640&crop=smart&auto=webp&s=f5a2f3f4e31bfbf7f8e8a0ada232e67620e39592'),
  ('Clásicas', 'Lo de siempre, la vieja confiable, panditas', 'https://preview.redd.it/three-cat-memes-for-your-collection-v0-tlormxy9l3ee1.jpg?width=640&crop=smart&auto=webp&s=f5a2f3f4e31bfbf7f8e8a0ada232e67620e39592'),
  ('Rellenas', 'Con (liquidos) dentro', 'https://preview.redd.it/three-cat-memes-for-your-collection-v0-tlormxy9l3ee1.jpg?width=640&crop=smart&auto=webp&s=f5a2f3f4e31bfbf7f8e8a0ada232e67620e39592'),
  ('Sin azúcar', 'Para los que quieren protección pero son disfrutones', 'https://preview.redd.it/three-cat-memes-for-your-collection-v0-tlormxy9l3ee1.jpg?width=640&crop=smart&auto=webp&s=f5a2f3f4e31bfbf7f8e8a0ada232e67620e39592');

INSERT INTO producto (nombre, imagen, precio, sabores, disponibilidad, "categoriaId") VALUES
  ('Aros ácidos', 'https://losarrayanes.mx/wp-content/uploads/2024/06/Sin-titulo-2-04-4.png', 45.00, 'fresa,manzana,limon', 80, 1),
  ('Panditas', 'https://i5.walmartimages.com.mx/samsmx/images/product-images/img_large/980005631-2l.jpg', 35.00, 'fresa,limon,naranja,uva', 120, 2),
  ('Fresas rellenas', 'https://media.mykaramelli.com/galeria/articulos/fresas-con-relleno_15826_1.jpg', 55.00, 'fresa', 30, 3),
  ('Ositos sin azúcar', 'https://m.media-amazon.com/images/I/81TM5Ybbz-L.jpg', 48.00, 'fresa,limon', 40, 4);
