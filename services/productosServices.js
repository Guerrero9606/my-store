const faker = require('faker');

class productosServices {
	constructor() {
		this.productos = [];
		this.generate();
	}

	generate() {
		const limit = 100;
		for (let index = 0; index < limit; index++) {
			this.productos.push({
				id: faker.datatype.uuid(),
				name: faker.commerce.productName(),
				price: parseInt(faker.commerce.price(), 10),
				image: faker.image.imageUrl(),
			});
		}
	}

	async create(data) {
		const newProducto = {
			id: faker.datatype.uuid(),
			...data
		};
		this.productos.push(newProducto);
		return newProducto;
	}

	async find() {
		return this.productos;
	}

	async findOne(id) {
		return this.productos.find(item => item.id === id);
	}

	async update(id, changes) {
		const index = this.productos.findIndex(item => item.id === id);
		if (index === -1) {
			throw new Error('Producto no encontrado');
		}
		const producto = this.productos[index];
		this.productos[index] = {
			...producto,
			...changes
		}
		return this.productos[index];
	}

	async delete(id) {
		const index = this.productos.findIndex(item => item.id === id);
		if (index === -1) {
			throw new Error('Producto no encontrado');
		}
		this.productos.splice(index, 1);
		return { id };
	}
}

module.exports = productosServices;
