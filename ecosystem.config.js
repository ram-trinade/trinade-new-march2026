module.exports = {
  apps: [{
    name: 'trinade',
    script: 'npm',
    args: 'run start',
    cwd: '/home/ubuntu/trinade-website/trinade-new-march2026',  // Adjust to your actual path
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production'
    }
  }]
}