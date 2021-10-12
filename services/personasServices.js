const faker = require('faker');

class personasServices {
	constructor(){
		this.personas = [];
		this.generate();
	}

	generate() {
		const limit = 100;
		for (let index = 0; index < limit; index++) {
			this.personas.push({
				id: faker.datatype.uuid(),
				firstname: faker.name.findName(),
				lastname: faker.name.lastName(),
				type: faker.company.bsAdjective(),
			});
		}
	}

	create(data) {
		const newPersona = {
			id: faker.datatype.uuid(),
			...data
		};
		this.personas.push(newPersona);
		return newPersona;
	}

	find() {
		return this.personas;
	}

	findOne(id) {
		return this.personas.find(item => item.id === id);
	}

	update(id, changes) {
		const index = this.personas.findIndex(item => item.id === id);
		if (index === -1) {
			throw new Error('Persona no encontrada');
		}
		const Persona = this.personas[index];
		this.personas[index] = {
			...Persona,
			...changes
		}
		return this.personas[index];
	}

	delete(id) {
		const index = this.personas.findIndex(item => item.id === id);
		if (index === -1) {
			throw new Error('Persona no encontrado');
		}
		this.personas.splice(index, 1);
		return { id };
	}
}

module.exports = personasServices;
