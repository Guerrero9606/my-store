const faker = require('faker');

class categoriasServices {
	constructor(){
		this.categorias = [];
		this.generate();
	}

	generate() {
		const limit = 100;
		for (let index = 0; index < limit; index++) {
			this.categorias.push({
				id: faker.datatype.uuid(),
				categoria: faker.commerce.productAdjective(),
			});
		}
	}

	create(data) {
		const newCategoria = {
			id: faker.datatype.uuid(),
			...data
		};
		this.categorias.push(newCategoria);
		return newCategoria;
	}

	find() {
		return this.categorias;
	}

	findOne(id) {
		return this.categorias.find(item => item.id === id);
	}

	update(id, changes) {
		const index = this.categorias.findIndex(item => item.id === id);
		if (index === -1) {
			throw new Error('Categoria no encontrada');
		}
		const categoria = this.categorias[index];
		this.categorias[index] = {
			...categoria,
			...changes
		}
		return this.categorias[index];
	}

	delete(id) {
		const index = this.categorias.findIndex(item => item.id === id);
		if (index === -1) {
			throw new Error('Categoria no encontrada');
		}
		this.categorias.splice(index, 1);
		return { id };
	}
}

module.exports = categoriasServices;
