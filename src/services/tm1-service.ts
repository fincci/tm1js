import { RestService, RestConfig } from './rest-service'
import { CubeService } from './cube-service'
import { DimensionService } from './dimension-service'
import { ProcessService } from './process-service'
import { ViewService } from './view-service'
import { SecurityService } from './security-service'
import { ChoreService } from './chore-service'
import { CellService } from './cell-service'
import ServerService from './server-service'

class TM1Service {
	private _rest: RestService
	public cubes: CubeService
	public dimensions: DimensionService
	public processes: ProcessService
	public chores: ChoreService
	public views: ViewService
	public security: SecurityService
	public cells: CellService
	public server: ServerService
	constructor(rest: RestService) {
		this._rest = rest
		this.cubes = new CubeService(this._rest)
		this.dimensions = new DimensionService(this._rest)
		this.processes = new ProcessService(this._rest)
		this.chores = new ChoreService(this._rest)
		this.views = new ViewService(this._rest)
		this.security = new SecurityService(this._rest)
		this.cells = new CellService(this._rest)
		this.server = new ServerService(this._rest)
	}

	static async connect(config: RestConfig) {
		const _rest = new RestService(config)
		await _rest.startSession(
			config.user,
			config.password,
			config.namespace,
			config.impersonate
		)
		return new TM1Service(_rest)
	}

	async logout() {
		return this._rest.logout()
	}

	get version() {
		return this._rest.version
	}
}

export { TM1Service }