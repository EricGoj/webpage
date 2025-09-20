/**
 * Centralized logging service for the application
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerConfig {
  enableInProduction: boolean;
  logLevel: LogLevel;
}

class Logger {
  private config: LoggerConfig = {
    enableInProduction: false,
    logLevel: 'info'
  };

  private shouldLog(level: LogLevel): boolean {
    if (typeof window === 'undefined') return false; // No logging in SSR
    
    const isDevelopment = import.meta.env.DEV;
    if (!isDevelopment && !this.config.enableInProduction) {
      return false;
    }

    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    const currentLevelIndex = levels.indexOf(this.config.logLevel);
    const messageLevelIndex = levels.indexOf(level);
    
    return messageLevelIndex >= currentLevelIndex;
  }

  debug(message: string, ...args: any[]): void {
    if (this.shouldLog('debug')) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.shouldLog('info')) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.shouldLog('warn')) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  error(message: string, error?: Error | unknown): void {
    if (this.shouldLog('error')) {
      console.error(`[ERROR] ${message}`, error);
      
      // In production, you might want to send errors to a monitoring service
      if (!import.meta.env.DEV && this.config.enableInProduction) {
        // Send to error tracking service (e.g., Sentry, LogRocket, etc.)
        this.sendToErrorTracking(message, error);
      }
    }
  }

  private sendToErrorTracking(message: string, error?: Error | unknown): void {
    // Placeholder for error tracking integration
    // Example: Sentry.captureException(error, { extra: { message } });
  }

  setConfig(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

// Export singleton instance
export const logger = new Logger();

// Export for testing purposes
export { Logger, type LogLevel, type LoggerConfig };
