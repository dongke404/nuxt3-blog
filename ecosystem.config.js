module.exports = {
  apps: [
    {
      name: 'nuxt3-blog', // 应用程序名称
      script: '.output/server/chunks/error-component.afc04ac8.mjs', // 应用程序的入口文件
      instances: 'max', // 最大运行实例数
      exec_mode: 'cluster', // 运行模式，这里使用 cluster 模式
      autorestart: true, // 自动重启
      watch: false, // 是否监视文件变化并自动重启
      max_memory_restart: '400M', // 当进程内存超过 1G 时自动重启
      env: {
        NODE_ENV: 'production', // 环境变量
      },
      env_development: {
        NODE_ENV: 'development', // 开发环境的环境变量
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z', // 日志的日期格式
      error_file: 'logs/error.log', // 错误日志文件
      out_file: 'logs/out.log', // 标准输出日志文件
      pid_file: 'pids/app.pid', // 进程 ID 文件
    },
  ],
}

