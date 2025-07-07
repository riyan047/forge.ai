FROM node:21-slim

# Install curl (E2B needs this)
RUN apt-get update && apt-get install -y curl && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working dir (where Next.js will be built)
WORKDIR /home/user

# Add startup script
COPY compile_page.sh /compile_page.sh
RUN chmod +x /compile_page.sh

# Create Next.js app
RUN npx --yes create-next-app@15.3.3 nextjs-app --yes
RUN cp -r nextjs-app/. . && rm -rf nextjs-app

# Add ShadCN
RUN npx --yes shadcn@2.6.3 init --yes -b neutral --force
RUN npx --yes shadcn@2.6.3 add --all --yes

# 🔥 Ensure correct working directory at runtime
WORKDIR /home/user

# Start command
CMD ["/compile_page.sh"]
